import { Link } from "react-router-dom";
import useStatefulValues from "../hooks/useStatefulValues";
import useAuthSubmit from "../hooks/useAuthSubmit";

export default function Register() {
    const [values, handleChange] = useStatefulValues();
    const [error, handleSubmit] = useAuthSubmit("/register.json", values);

    return (
        <div>
            {error && <p>oops, something went wrong</p>}

            <p>
                register or
                <Link to="/login"> log in</Link>
            </p>

            <input
                onChange={handleChange}
                type="text"
                name="first"
                placeholder="first name"
            />
            <input
                onChange={handleChange}
                type="text"
                name="last"
                placeholder="last name"
            />
            <input
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="email address"
            />
            <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="password"
            />
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}
