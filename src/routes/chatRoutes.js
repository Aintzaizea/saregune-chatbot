import { Router } from "express";
import {responderChat} from "../controllers/chatController.js";

const router = Router();

router.post('/chat',responderChat);

export default router;