import { Router } from 'express';
import { 
    obtenerConocimientos, 
    obtenerConocimientoPorId, 
    crearConocimiento, 
    actualizarConocimiento, 
    eliminarConocimiento 
} from '../controllers/conocimientosController.js';

const router = Router();

//CRUD para Admin de la bd (conocimientos)
router.get('/conocimientos', obtenerConocimientos);
router.get('/conocimientos/:id', obtenerConocimientoPorId);
router.post('/conocimientos', crearConocimiento);
router.put('/conocimientos/:id', actualizarConocimiento);
router.delete('/conocimientos/:id', eliminarConocimiento);

export default router;