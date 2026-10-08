import * as sareguneConocimientos from "../models/conocimiento.js";

// GET - Obtener todos los conocimientos (Existente)
export const obtenerConocimientos = async (req, res) => {
    try {
        const conocimientos = await sareguneConocimientos.obtenerTodosLosConocimientos();
        res.json(conocimientos);
    } catch (error) {
        console.error("Error en conocimientosController (obtenerConocimientos):", error);
        res.status(500).json({ error: "Error al leer los conocimientos" });
    }
};

// GET - Obtener un conocimiento por su ID
export const obtenerConocimientoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const conocimiento = await sareguneConocimientos.obtenerConocimientoPorId(id);
        if (!conocimiento) {
            return res.status(404).json({ error: "Conocimiento no encontrado" });
        }
        res.json(conocimiento);
    } catch (error) {
        console.error("Error en conocimientosController (obtenerConocimientoPorId):", error);
        res.status(400).json({ error: "ID no válido o error al buscar el conocimiento" });
    }
};

// POST - Crear un nuevo conocimiento (Admin CRUD)
export const crearConocimiento = async (req, res) => {
    try {
        const nuevoConocimiento = req.body;
        const resultado = await sareguneConocimientos.crearConocimiento(nuevoConocimiento);
        res.status(201).json({
            mensaje: "Conocimiento creado con éxito",
            conocimiento: resultado
        });
    } catch (error) {
        console.error("Error en conocimientosController (crearConocimiento):", error);
        res.status(400).json({ error: "Error al crear el conocimiento" });
    }
};

// PUT - Actualizar un conocimiento existente (Admin CRUD)
export const actualizarConocimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const resultado = await sareguneConocimientos.actualizarConocimiento(id, datosActualizados);

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Conocimiento no encontrado para actualizar" });
        }

        res.json({ mensaje: "Conocimiento actualizado correctamente" });
    } catch (error) {
        console.error("Error en conocimientosController (actualizarConocimiento):", error);
        res.status(400).json({ error: "Error al actualizar el conocimiento" });
    }
};

// DELETE - Eliminar un conocimiento (Admin CRUD)
export const eliminarConocimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await sareguneConocimientos.eliminarConocimiento(id);

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Conocimiento no encontrado para eliminar" });
        }

        res.json({ mensaje: "Conocimiento eliminado correctamente" });
    } catch (error) {
        console.error("Error en conocimientosController (eliminarConocimiento):", error);
        res.status(400).json({ error: "Error al eliminar el conocimiento" });
    }
};


