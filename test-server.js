import "dotenv/config";
import express from "express";
import { responderChat } from "./src/controllers/chatController.js";

const app = express();
app.use(express.json());

app.post("/chat", responderChat);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

