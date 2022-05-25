import { useState } from "react";

type url = "/register.json" | "/login.json";

export default function useAuthSubmit(url: url, values: object) {
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const { success } = await response.json();
            success ? location.replace("/") : setError(true);
        } catch (e) {
            console.log("e in handleSubmit ", e);
            setError(true);
        }
    };

    return [error, handleSubmit] as const;
}
