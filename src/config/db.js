
import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/saregune_chatbot';
const client = new MongoClient(url);
let db;

export async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db();
        console.log("¡Conectado con éxito a MongoDB!");
    }
    return db;
}