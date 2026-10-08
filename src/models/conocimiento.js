import { connectDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Obtener todos los datos
export async function obtenerTodosLosConocimientos() {
    try {
        const db = await connectDB();
        const conocimientos = await db.collection('conocimientos').find({}).toArray();
        return conocimientos;
    } catch (error) {
        console.error("Error en el modelo conocimiento (obtenerTodosLosConocimientos):", error);
        throw error; 
    }
}

// Obtener un único dato por su ID
export async function obtenerConocimientoPorId(id) {
    try {
        const db = await connectDB();
        const conocimiento = await db.collection('conocimientos').findOne({ _id: new ObjectId(id) });
        return conocimiento;
    } catch (error) {
        console.error("Error en el modelo conocimiento (obtenerConocimientoPorId):", error);
        throw error;
    }
}

// Crear un nuevo
export async function crearConocimiento(datos) {
    try {
        const db = await connectDB();
        const resultado = await db.collection('conocimientos').insertOne(datos);
        return { _id: resultado.insertedId, ...datos };
    } catch (error) {
        console.error("Error en el modelo conocimiento (crearConocimiento):", error);
        throw error;
    }
}

// Actualizar 
export async function actualizarConocimiento(id, datos) {
    try {
        const db = await connectDB();
        const resultado = await db.collection('conocimientos').updateOne(
            { _id: new ObjectId(id) },
            { $set: datos }
        );
        return resultado;
    } catch (error) {
        console.error("Error en el modelo conocimiento (actualizarConocimiento):", error);
        throw error;
    }
}

// Eliminar
export async function eliminarConocimiento(id) {
    try {
        const db = await connectDB();
        const resultado = await db.collection('conocimientos').deleteOne({ _id: new ObjectId(id) });
        return resultado;
    } catch (error) {
        console.error("Error en el modelo conocimiento (eliminarConocimiento):", error);
        throw error;
    }
}