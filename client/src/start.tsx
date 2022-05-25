import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./welcome/welcome";

fetch("/userInfo.json")
    .then((res) => res.json())
    .then(({ userId }) => {
        if (!userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    });
