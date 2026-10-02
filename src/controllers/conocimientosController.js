import * as sareguneConocimientos from "../models/conocimiento.js";

// GET obtener conocimientos
export const obtenerConocimientos = async (req, res) => {
    try {
        const conocimientos = await sareguneConocimientos.obtenerTodosLosConocimientos();
        res.json(conocimientos);
    } catch (error) {
        console.error("Error en conocimientosController:", error);
        res.status(500).json({ error: "Error al leer los conocimientos" });
    }
};



