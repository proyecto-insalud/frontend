"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import styles from "./LoginPage.module.css";

interface JwtPayload {
    sub: string;
    role?: string;
    exp: number;
}

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();  // Access login function from context
    const [username, setUsername] = useState(""); // State for username input
    const [password, setPassword] = useState(""); // State for password input

    // Handle login action
    const handleLogin = async () => {
        try {
            // Make a POST request to authenticate
            const response = await fetch("http://localhost:8093/api/v1/authentication/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Error en login");

            const data = await response.json();

            // Save token to context and localStorage
            login(data.token);

            // Decode the token to get the user role
            const userRole = data.roles[0] || "ROLE_PACIENTE"; // Default to 'ROLE_PACIENTE'

            // Redirect based on the role
            if (userRole === "ROLE_ADMIN") {
                router.push("/admin/atenciones");
            } else {
                router.push("/paciente/atenciones");
            }
        } catch (err) {
            console.error(err);
            alert("Error en login");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    className={styles.input}
                />
                <button onClick={handleLogin} className={styles.button}>
                    Entrar
                </button>
            </div>
        </div>
    );
}
