// src/app/services/atenciones.ts
import { useAuth } from "../context/AuthContext";

export function useAtencionesApi() {
    const { fetchWithAuth } = useAuth();

    const getAll = async () => {
        return await fetchWithAuth("http://localhost:8093/api/v1/atenciones");
    };

    const getMias = async () => {
        return await fetchWithAuth("http://localhost:8093/api/v1/atenciones/mias");
    };

    const create = async (data: any) => {
        const payload = {
            fecha: data.fecha,
            motivo: data.motivo,
            pacienteId: Number(data.pacienteId),
            medicoId: Number(data.medicoId ?? 0),
        };
        return await fetchWithAuth("http://localhost:8093/api/v1/atenciones", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    };

    const update = async (id: number, data: any) => {
        const payload = {
            fecha: data.fecha,
            motivo: data.motivo,
            pacienteId: Number(data.pacienteId),
            medicoId: Number(data.medicoId ?? 0),
        };
        return await fetchWithAuth(`http://localhost:8093/api/v1/atenciones/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        });
    };

    const remove = async (id: number) => {
        const res = await fetchWithAuth(`http://localhost:8093/api/v1/atenciones/${id}`, {
            method: "DELETE",
        });

        // Si fetchWithAuth devolvió Response (p.ej. 204 No Content)
        if (typeof (res as any).status === "number") {
            const r = res as Response;
            if (!r.ok) throw new Error("Error al eliminar");
            return true;
        }

        // Si devolvió JSON / objeto
        return res;
    };

    return { getAll, getMias, create, update, remove };
}
