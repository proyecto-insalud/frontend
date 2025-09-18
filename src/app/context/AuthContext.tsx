"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Define JWT Payload structure
interface JwtPayload {
    sub: string;
    role?: string; // Role is optional, depends on backend response
    exp: number;
}

interface AuthContextType {
    token: string | null; // Stores authentication token
    role: string | null; // Stores user role
    login: (token: string) => void; // Function to log in
    logout: () => void; // Function to log out
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<any>; // Function to make authenticated API requests
}

// Create AuthContext to manage authentication state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null); // Store the JWT token
    const [role, setRole] = useState<string | null>(null); // Store the user's role

    // On component mount, check if there is a stored token
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const decoded: JwtPayload = jwtDecode(storedToken); // Decode JWT token to get role and expiration
            setRole(decoded.role || null);
        }
    }, []);

    // Function to log in and set token and role
    const login = (jwt: string) => {
        setToken(jwt);
        localStorage.setItem("token", jwt); // Store token in localStorage

        const decoded: JwtPayload = jwtDecode(jwt);
        setRole(decoded.role || null); // Set the user's role from the decoded token
    };

    // Function to log out and clear token and role
    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("token"); // Remove token from localStorage
    };

    // Function to fetch data with authorization token
    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        if (!token) throw new Error("No token available. Please log in."); // Ensure token exists before making request

        console.log("Using token:", token); // Debugging
        const response = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        });

        // If token is expired or invalid, log out and prompt re-login
        if (response.status === 401) {
            logout();
            throw new Error("Invalid or expired token. Please log in again.");
        }

        return response.json(); // Return the response as JSON
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout, fetchWithAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
