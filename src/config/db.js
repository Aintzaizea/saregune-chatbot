import { MongoClient } from 'mongodb';
let db = null;

export const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        // Nombre de la base de datos (la parte antes del ? en la URI)
        db = client.db('saregune-chatbot');
        console.log('Conectado a MongoDB');
        return db;
        
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('Base de datos no inicializada. Llama a connectDB() primero.');
    }
    return db;
};