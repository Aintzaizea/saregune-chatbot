import * as sareguneConocimientos from "../models/conocimiento.js";

// GET Conocimientos
export const obtenerTodosLosConocimientos = async (req, res) => {
    try {
        const conocimientos = await sareguneConocimientos.obtenerTodosLosConocimientos();
        res.json(conocimientos);
    } catch (error) {
        res.status(500).json({ error: "Error al leer los conocimientos" });
    }
};

//POST Añadir Curso
