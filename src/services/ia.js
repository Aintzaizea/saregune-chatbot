import 'dotenv/config';
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function preguntarIA(mensajeUsuario) {
    const completion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "system",
                content: "Eres el asistente virtual de Saregune, te llamas Sare, una asociación de e-inclusión y software libre en Vitoria-Gasteiz. Responde de forma amable, clara y muy sencilla."
            },
            { role: "user", content: mensajeUsuario },
        ],
        temperature: 0.2,
    });

    return completion.choices[0].message.content;
}