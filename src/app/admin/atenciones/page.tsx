"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useAtencionesApi } from "../../services/atenciones";
import styles from "./AdminAtencionesPage.module.css";

export default function AdminAtencionesPage() {
    // Get functions to manage atenciones from the API
    const { getAll, create, update, remove } = useAtencionesApi();
    const { logout } = useAuth();
    const router = useRouter();

    // State to manage the list of atenciones and input data
    const [atenciones, setAtenciones] = useState<any[]>([]);
    const [newAtencion, setNewAtencion] = useState({ fecha: "", motivo: "", pacienteId: "", medicoId: "" });
    const [editing, setEditing] = useState<any | null>(null);

    // Load atenciones when the component mounts
    useEffect(() => {
        load();
    }, []);

    // Function to load atenciones from the API
    const load = async () => {
        try {
            const data = await getAll();
            setAtenciones(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            alert("Error loading atenciones");
        }
    };

    // Function to create a new atencion
    const handleCreate = async () => {
        try {
            const created = await create(newAtencion);
            if (created && !(created instanceof Response) && "id" in created) {
                setAtenciones([...atenciones, created]);
            } else {
                await load();
            }
            // Reset the new atencion form
            setNewAtencion({ fecha: "", motivo: "", pacienteId: "", medicoId: "" });
        } catch (e) {
            console.error(e);
            alert("Error creating atencion");
        }
    };

    // Function to update an existing atencion
    const handleUpdate = async () => {
        if (!editing) return;
        try {
            const updated = await update(editing.id, editing);
            if (updated && !(updated instanceof Response) && "id" in updated) {
                setAtenciones(atenciones.map(a => (a.id === editing.id ? updated : a)));
            } else {
                await load();
            }
            // Clear the editing state
            setEditing(null);
        } catch (e) {
            console.error(e);
            alert("Error updating atencion");
        }
    };

    // Function to delete an atencion
    const handleDelete = async (id: number) => {
        try {
            await remove(id);
            // Remove the deleted atencion from the state
            setAtenciones(atenciones.filter(a => a.id !== id));
        } catch (e) {
            console.error(e);
            alert("Error deleting atencion");
        }
    };

    // Function to log out the user
    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Atenciones Panel (ADMIN)</h1>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>

            {/* Create Atencion */}
            <section className={styles.section}>
                <h2>Create Atencion</h2>
                <input
                    type="date"
                    value={newAtencion.fecha}
                    onChange={(e) => setNewAtencion({ ...newAtencion, fecha: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Motivo"
                    value={newAtencion.motivo}
                    onChange={(e) => setNewAtencion({ ...newAtencion, motivo: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Paciente ID"
                    value={newAtencion.pacienteId}
                    onChange={(e) => setNewAtencion({ ...newAtencion, pacienteId: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Medico ID"
                    value={newAtencion.medicoId}
                    onChange={(e) => setNewAtencion({ ...newAtencion, medicoId: e.target.value })}
                    className={styles.input}
                />
                <button onClick={handleCreate} className={styles.button}>Create</button>
            </section>

            {/* Edit Atencion */}
            {editing && (
                <section className={styles.section}>
                    <h2>Edit Atencion</h2>
                    <input
                        type="date"
                        value={editing.fecha}
                        onChange={(e) => setEditing({ ...editing, fecha: e.target.value })}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        value={editing.motivo}
                        onChange={(e) => setEditing({ ...editing, motivo: e.target.value })}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={editing.pacienteId}
                        onChange={(e) => setEditing({ ...editing, pacienteId: e.target.value })}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={editing.medicoId}
                        onChange={(e) => setEditing({ ...editing, medicoId: e.target.value })}
                        className={styles.input}
                    />
                    <div className={styles.buttons}>
                        <button onClick={handleUpdate} className={styles.button}>Update</button>
                        <button onClick={() => setEditing(null)} className={styles.button}>Cancel</button>
                    </div>
                </section>
            )}

            {/* List of Atenciones */}
            <section className={styles.section}>
                <h2>Atenciones List</h2>
                <ul>
                    {atenciones.map((a) => (
                        <li key={a.id} className={styles.listItem}>
                            <div>
                                {a.fecha} - {a.motivo}
                                (Paciente {a.pacienteId}, Médico {a.medicoId}){" "}
                                <strong>[{a.estado}]</strong>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={() => setEditing(a)} className={styles.button}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this atencion?")) {
                                            handleDelete(a.id);
                                        }
                                    }}
                                    className={styles.button}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
