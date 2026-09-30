import { preguntarIA } from "../services/ia";

export async function responderChat(req, res) => {
    const { mensajeUsuario } = req.body;

    try {
        // 1. Sacar todo el conocimiento de la base de datos 

        //SE CAMBIARA LA BASE DE DATOS UNA VEZ SE VALLA ANIDANDO
        const conocimientos = await db.collection('conocimientos').find({}).toArray();
        //2. formatear como texto para la IA
        const contextoTexto =conocimientos.map

    }

}