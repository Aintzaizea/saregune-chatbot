import dotenv from 'dotenv/config';
import OpenAI from "openai";
import { Messages } from 'openai/resources/chat/completions.js';
import { Content } from 'openai/resources/skills.mjs';

const openai = new OpenAI({ apiKey: process.env.AI_API_KEY, baseURL: "https://api.groq.com/openai/v1", });

export async function preguntarIA(mensajeUsuario) {
    const response = await client.chat.responses.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: mensajeUsuario }],
    });

    console.log(response.output_text);

}

