import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';

const todosLosConocimientos = [
    //  PREGUNTAS GENERAL DE SAREGUNE 
    {
        categoria: "horarios",
        pregunta: "¿Cuáles son los horarios de atención de Saregune?",
        respuesta: "Atendemos de lunes a viernes por las mañanas de 9:30 a 13:30. Las tardes están destinadas a cursos programados."
    },
    {
        categoria: "ubicacion",
        pregunta: "¿Dónde está ubicada la oficina de Saregune?",
        respuesta: "Estamos en el Casco Viejo de Vitoria-Gasteiz, en Cantón de Santa María, 4 (01001 Vitoria-Gasteiz)."
    },
    {
        categoria: "inscripcion",
        pregunta: "¿Cómo me puedo inscribir en los cursos?",
        respuesta: "La inscripción es OBLIGATORIAMENTE PRESENCIAL en Cantón de Santa María, 4, o llamando al 945 03 99 81 / Whatsapp 688 85 16 41."
    },
    {
        categoria: "contacto",
        pregunta: "¿Cuál es el teléfono y correo de contacto?",
        respuesta: "Puedes llamarnos al 945 15 01 22 / 945 03 99 81 o escribirnos a info@saregune.net."
    },

    // CURSOS Y HORARIOS (SEPTIEMBRE - DICIEMBRE 2026) 
    {
        categoria: "cursos_septiembre",
        pregunta: "¿Qué cursos hay en Septiembre de 2026?",
        respuesta: "En septiembre 2026 ofrecemos: Procesador de textos y Hoja de cálculo (9:00-10:15), Iniciación a la informática (10:30-11:45, 12:00-13:15, 15:00-16:15, 18:00-19:15), Presentaciones y Recursos Google (13:30-14:45), Multimedia online y Trámites fáciles (16:30-17:45)."
    },
    {
        categoria: "cursos_octubre",
        pregunta: "¿Qué cursos hay en Octubre de 2026?",
        respuesta: "En octubre 2026 ofrecemos: Iniciación a la informática (9:00-10:15, 10:30-11:45, 13:30-14:45, 16:30-17:45), Multimedia online y Trámites fáciles (12:00-13:15), Hoja de cálculo y Procesador de textos (15:00-16:15), Recursos Google y Presentaciones (18:00-19:15)."
    },
    {
        categoria: "cursos_noviembre",
        pregunta: "¿Qué cursos hay en Noviembre de 2026?",
        respuesta: "En noviembre 2026 ofrecemos: Multimedia online y Trámites fáciles (9:00-10:15), Iniciación a la informática (10:30-11:45, 12:00-13:15, 15:00-16:15, 18:00-19:15), Procesador de textos y Hoja de cálculo (13:30-14:45), Presentaciones y Recursos Google (16:30-17:45)."
    },
    {
        categoria: "cursos_diciembre",
        pregunta: "¿Qué cursos hay en Diciembre de 2026?",
        respuesta: "En diciembre 2026 ofrecemos: Recursos Google y Presentaciones (9:00-10:15), Iniciación a la informática (10:30-11:45, 13:30-14:45, 16:30-17:45, 18:00-19:15), Procesador de textos y Hoja de cálculo (12:00-13:15), Multimedia online y Trámites fáciles (15:00-16:15)."
    }
];

async function sembrarBaseDatos() {
    try {
        const db = await connectDB();
        const coleccion = db.collection('conocimientos');

        // Limpiar colección antigua si existe
        await coleccion.deleteMany({});

        // Insertar datos nuevos
        await coleccion.insertMany(todosLosConocimientos);

        console.log("¡Base de datos inicializada correctamente en MongoDB!");
        process.exit(0);
    } catch (error) {
        console.error("Error al sembrar la base de datos:", error);
        process.exit(1);
    }
}

sembrarBaseDatos();