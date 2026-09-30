import * as sareguneConocimientos from '../models/conocimiento.js'

// GET Conocimientos 
export const obtenerTodosLosConocimientos = async (req, res) => {
    const cursos = await curso.getAll();
    res.json(cursos);
};

//POST Añadir Curso




