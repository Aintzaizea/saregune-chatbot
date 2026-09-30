import * as sareguneCursos from '../models/conocimiento.js'

// GET Conocimientos 
export const ObtnerConocimientos = async (requestAnimationFrame, res) => {
    const cursos = await curso.getAll();
    res.json(cursos);
};

//POST Añadir Curso




