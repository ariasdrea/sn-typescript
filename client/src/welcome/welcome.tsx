import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";

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
                </div>
            </BrowserRouter>
        </div>
    );
}
