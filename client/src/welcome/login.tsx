import useStatefulValues from "../hooks/useStatefulValues";
import useAuthSubmit from "../hooks/useAuthSubmit";
import { Link } from "react-router-dom";

export default function Login() {
    const [values, handleChange] = useStatefulValues();
    const [error, handleSubmit] = useAuthSubmit("/login.json", values);

    return (
        <div>
            {error && <p>oops, something went wrong</p>}
            <p>
                login or
                <Link to="/"> register</Link>
            </p>
            <input
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
            />
            <input
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="password"
            />
            <button onClick={handleSubmit}>Login</button>

            <Link to="/reset">
                <p> Reset Password</p>
            </Link>
        </div>
    );
}
