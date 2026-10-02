import 'dotenv/config';
import OpenAI from "openai";
import { obtenerTodosLosConocimientos } from '../models/conocimiento.js';

const client = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function preguntarIA(mensajeUsuario) {
    const conocimientos = await obtenerTodosLosConocimientos();
    const contextoTexto = conocimientos.map(k => `- P: ${k.pregunta} | R: ${k.respuesta}`)
        .join('\n');

    //llamar la Ia
    const completion = await client.chat.completions.create
        ({
            model: process.env.AI_MODEL || "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: `Eres el asistente virtual de Saregune, te llamas Sare, una asociación de e-inclusión y software libre en Vitoria-Gasteiz. Responde de forma amable, clara y muy sencilla, con frases cortas y en texto plano (sin asteriscos ni listas).Trata siempre de tú a la persona.Usa SOLO la siguiente información. Si la respuesta no está, di amablemente que llamen al contacto telefonico 945 03 99 81 .Informacion de Saregune: ${contextoTexto}`,
                },
                { role: "user", content: mensajeUsuario },
            ],
            temperature: 0.2,
        });

    return completion.choices[0].message.content;
}

