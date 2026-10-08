import { preguntarIA } from "../services/ia.js";
import { obtenerTodosLosConocimientos } from "../models/conocimiento.js";

export async function responderChat(req, res) {

    try {
        const { mensajeUsuario, historial = [] } = req.body;
        // Validación básica
        if (!mensajeUsuario || mensajeUsuario.trim() === "") {
            return res.status(400).json({ error: "Escribe tu pregunta y te ayudo 😊" });
        }

        const respuesta = await preguntarIA(mensajeUsuario, historial);
        res.json({ respuesta });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ahora mismo no puedo responder 😊\nInténtalo de nuevo en unos minutos o llámanos al 945 03 99 81.",
        });
    }
}
