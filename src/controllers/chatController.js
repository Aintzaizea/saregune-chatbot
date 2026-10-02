import { preguntarIA } from "../services/ia.js";

export async function responderChat(req, res) {
    try {
        const { mensajeUsuario } = req.body;
        // Validación básica
        if (!mensajeUsuario || mensajeUsuario.trim() === "") {
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }
        const respuesta = await preguntarIA(mensajeUsuario);
        res.json({ respuesta });
    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: "Ahora mismo no puedo responder. Inténtalo de nuevo en unos minutos.",
        });
    }
}
