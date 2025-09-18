"use client";

import { useEffect, useState } from "react";
import { useAtencionesApi } from "../../services/atenciones";
import { useAuth } from "../../context/AuthContext";
import styles from "./PacienteAtencionesPage.module.css";

export default function MisAtencionesPage() {
    // Get the function to fetch patient-specific attention data
    const { getMias } = useAtencionesApi();
    const [atenciones, setAtenciones] = useState<any[]>([]);
    const { logout } = useAuth();

    // Fetch the patient's attention data on component mount
    useEffect(() => {
        getMias().then(setAtenciones).catch(console.error);
    }, []);

    // Handle logout functionality
    const handleLogout = () => {
        logout();
        window.location.href = "/login";  // Redirect to login page after logout
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Mis Atenciones</h1>
                <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
            </div>

            {/* List of the patient's appointments */}
            <ul className={styles.list}>
                {atenciones.map((a) => (
                    <li key={a.id} className={styles.listItem}>
                        {a.fecha} - {a.motivo} (Médico {a.medicoId})
                    </li>
                ))}
            </ul>
        </div>
    );
}
