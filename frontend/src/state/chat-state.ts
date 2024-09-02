import { makeAutoObservable, reaction } from "mobx"
import { Message, User } from "../types"
import { AppService } from "./app-service"
import { PollingService } from "./polling-service"

export class ChatState {
    currentUserName: string = ''
    connectedAt: string = ''

    users: User[] = []

    chat: Message[] = []

    busy: boolean = false

    loginError: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn(): boolean {
        return !!this.currentUserName
    }

    get hasError(): boolean {
        return !!this.loginError
    }

    reset = () => {
        this.busy = false
        this.chat = []
        this.connectedAt = ''
        this.currentUserName = ''
        this.users = []
        this.loginError = ''
    }
}

export const chatState = new ChatState()
export const appService = new AppService(chatState)

const pollingService = new PollingService(appService)

reaction(
    () => chatState.isLoggedIn,
    isLoggedIn => {
        if (isLoggedIn) {
            pollingService.start()
        } else {
            pollingService.stop()
        }
        console.log("Login state:", isLoggedIn)
    }
)
