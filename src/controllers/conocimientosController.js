import { obtenerTodosLosConocimientos } from '../models/conocimiento.js';

export async function obtenerConocimientos(req, res) {
    try {
        const datos = await obtenerTodosLosConocimientos();
        res.json(datos);
    } catch (error) {
        console.error("Detalle del error en el controlador:", error);
        res.status(500).json({ error: "Error al obtener conocimientos" });
    }
}