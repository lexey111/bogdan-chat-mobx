import { AppService } from "./app-service";

const POLLING_FREQ = 1000

export class PollingService {
    private interval: ReturnType<typeof setInterval> = 0

    constructor(private service: AppService) {
        //
    }

    start = () => {
        clearInterval(this.interval)
        console.log('Polling: start');

        this.interval = setInterval(() => {
            console.log('tick');

            void this.service.getUsers();
            void this.service.getMessages();
        }, POLLING_FREQ);

    }

    stop = () => {
        console.log('Polling: stop');

        clearInterval(this.interval)
    }
}
