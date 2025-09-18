export interface LoginData {
    username: string;
    password: string;
}

export async function loginUser(data: LoginData) {
    const response = await fetch("http://localhost:8093/api/v1/authentication/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Login fallido");
    }

    return await response.json();
}
