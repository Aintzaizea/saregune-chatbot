import { Router } from 'express';
import { obtenerConocimientos } from '../controllers/conocimientosController.js';

const router = Router();

router.get('/conocimientos', obtenerConocimientos);

export default router;