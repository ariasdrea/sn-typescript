import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Reset from "./reset";

export default function Welcome() {
    return (
        <div>
            <h1>The welcome page</h1>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <Reset />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
