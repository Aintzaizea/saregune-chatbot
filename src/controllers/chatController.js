import { preguntarIA } from "../services/ia.js";

export async function responderChat(req, res) {
    const { mensajeUsuario } = req.body;

    // Validación básica
    if (!mensajeUsuario || mensajeUsuario.trim() === "") {
        return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    try {
        // 1. Sacar todo el conocimiento de la base de datos 
        //SE CAMBIARA LA BASE DE DATOS UNA VEZ SE VALLA ANIDANDO

        const respuesta = await db.preguntarIA(mensajeUsuario);
        res.json({ respuesta });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ahora mismo no puedo responder. Inténtalo de nuevo en unos minutos.",

        });
    }
}