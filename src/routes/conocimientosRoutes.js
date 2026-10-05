import { Router } from 'express';
import { obtenerConocimientos } from '../controllers/conocimientosController.js';

const router = Router();

// Endpoint GET para leer los conocimientos
router.get('/conocimientos', obtenerConocimientos);

export default router;