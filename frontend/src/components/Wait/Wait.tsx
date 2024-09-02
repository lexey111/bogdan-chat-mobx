import { observer } from "mobx-react-lite";
import "./Wait.styles.css";

export const Wait: React.FC = observer(() => {
  return (
    <div className="main-app-wait">
      <div className="wait-container card">Loading...</div>
    </div>
  );
});
