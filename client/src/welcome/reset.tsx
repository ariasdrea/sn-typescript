import { Link } from "react-router-dom";
import { useState } from "react";
import useStatefulValues from "../hooks/useStatefulValues";
// import useAuthSubmit from "../hooks/useAuthSubmit";

export default function Reset() {
    const [currentStep, setCurrentStep] = useState(1);
    const [values, handleChange] = useStatefulValues();
    const [error, setError] = useState(false);

    const resetUrl: string =
        currentStep === 1 ? "/reset.json" : "/reset-verify.json";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(resetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const { success } = await response.json();

        if (success && resetUrl === "/reset.json") {
            setCurrentStep(2);
        } else if (success && resetUrl === "/reset-verify.json") {
            error && setError(false);
            setCurrentStep(3);
        } else {
            setError(true);
        }
    };

    const renderDisplay = () => {
        if (currentStep == 1) {
            return (
                <div>
                    <h2>Step {currentStep} of 3</h2>
                    <h3>Enter your Email Address</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            key={1}
                            onChange={handleChange}
                            type="text"
                            name="email"
                            placeholder="email address"
                        />
                        <button>Submit</button>
                    </form>
                </div>
            );
        }

        if (currentStep === 2) {
            return (
                <div>
                    <h2>Step {currentStep} of 3</h2>
                    <h3>Verify yourself</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            key={2}
                            onChange={handleChange}
                            type="text"
                            name="code"
                            placeholder="code"
                        />

                        <input
                            key={3}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="password"
                        />
                        <button>Submit</button>
                    </form>
                </div>
            );
        }

        if (currentStep === 3) {
            return (
                <div>
                    <h1>You've successfully reset your password</h1>
                    <h3>
                        Click <Link to="/login">here</Link> to login
                    </h3>
                </div>
            );
        }
    };

    return (
        <div>
            <Link to="/login"></Link>
            <h2>Reset Password</h2>
            {renderDisplay()}
            {error && <p>oops, something went wrong</p>}
        </div>
    );
}
