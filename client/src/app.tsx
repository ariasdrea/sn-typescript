import Logo from "./logo";

export default function App() {
    return (
        <div>
            <nav>
                <a href="/logout">
                    <p>Logout</p>
                </a>
            </nav>
            <h2>App - Logged In Experience</h2>
            <Logo />
        </div>
    );
}
