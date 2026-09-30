import { connectDB } from '../config/db.js';

export async function obtenerTodosLosConocimientos() {
    try {
        const db = await connectDB();
       
        const conocimientos = await db.collection('conocimientos').find({}).toArray();
        return conocimientos;
    } catch (error) {
        console.error("Error en el modelo conocimiento:", error);
        throw error; 
    }
}