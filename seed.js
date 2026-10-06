import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';

const todosLosConocimientos = [
  //  INFORMACIÓN GENERAL Y CONTACTO 
  {
    categoria: "Información General",
    tipo: "institucional",
    pregunta: "¿Qué es Saregune?",
    respuesta: "Saregune es un proyecto comunitario de Sartu Álava en el Casco Viejo de Vitoria-Gasteiz. Promovemos el uso libre y gratuito de las TIC para la inclusión social y la dinamización del barrio."
  },
  {
    categoria: "Contacto",
    tipo: "contacto",
    pregunta: "¿Dónde está Saregune y cómo contactar?",
    respuesta: "Estamos en Saregune, en Cantón de Santa María, 4 (Vitoria-Gasteiz). Horario: lunes a viernes de 9:00 a 18:00. Teléfono: 945 03 99 81 | WhatsApp: 688 85 16 41. Correo (solo si lo solicitan): info@saregune.net."
  },

  //  MENÚ GENERAL DE CURSOS (DESCOBRIMIENTO PASO A PASO) 
  {
    categoria: "Cursos",
    tipo: "menu_general",
    nombre: "Menú general de cursos",
    descripcion: "Ofrecemos dos grandes tipos de formación totalmente gratuita: Cursos básicos (para el día a día) y Formación avanzada / Lanbide (para orientación laboral).",
    pregunta: "¿Qué tipo de cursos ofrecen?",
    respuesta: "Ofrecemos dos opciones gratuitas:\n1. Cursos básicos: Para aprender y mejorar el uso del ordenador e internet.\n2. Formación avanzada: Cursos orientados al empleo como Programación Web o Dinamización Social."
  },

  //  CURSOS BÁSICOS 
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Iniciación a la informática",
    descripcion: "Para aprender a familiarizarse con el ordenador y adquirir conocimientos digitales básicos.",
    horarios: {
      octubre: ["09:00–10:15", "10:30–11:45", "13:30–14:45", "16:30–17:45"],
      noviembre: ["10:30–11:45", "12:00–13:15", "15:00–16:15", "18:00–19:15"],
      diciembre: ["10:30–11:45", "13:30–14:45", "16:30–17:45", "18:00–19:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune, en Cantón de Santa María, 4.",
    pregunta: "Curso Iniciación a la informática",
    respuesta: "Curso básico para aprender a usar el ordenador desde cero. Disponibilidad en octubre, noviembre y diciembre con varios horarios de mañana y tarde."
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Procesador de textos y Hoja de cálculo",
    descripcion: "Aprende a redactar documentos y organizar datos en tablas.",
    horarios: {
      octubre: ["15:00–16:15"],
      noviembre: ["13:30–14:45"],
      diciembre: ["12:00–13:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune, en Cantón de Santa María, 4.",
    pregunta: "Curso Procesador de textos y Hoja de cálculo",
    respuesta: "Aprende a crear documentos de texto y gestionar plantillas u hojas de cálculo."
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Multimedia online y Trámites fáciles",
    descripcion: "Aprende a hacer trámites por internet y usar herramientas multimedia.",
    horarios: {
      octubre: ["12:00–13:15"],
      noviembre: ["09:00–10:15"],
      diciembre: ["15:00–16:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune, en Cantón de Santa María, 4.",
    pregunta: "Curso Multimedia online y Trámites fáciles",
    respuesta: "Para realizar gestiones por internet cotidianas de forma sencilla."
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Recursos Google y Presentaciones",
    descripcion: "Descubre Drive, Gmail y la creación de presentaciones visuales.",
    horarios: {
      octubre: ["18:00–19:15"],
      noviembre: ["16:30–17:45"],
      diciembre: ["09:00–10:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune, en Cantón de Santa María, 4.",
    pregunta: "Curso Recursos Google y Presentaciones",
    respuesta: "Domina las herramientas de la nube de Google y crea diapositivas."
  },

  //  FORMACIÓN AVANZADA 
  {
    categoria: "Cursos",
    tipo: "avanzado",
    nombre: "Programación Web",
    certificado: "Certificado Profesional IFCD0210",
    horas: 480,
    horario: "Lunes a viernes de 9:00 a 14:00",
    requisitos: "Desempleo/mejora de empleo (Lanbide), Bachillerato/FP2/Grado Superior o equivalente.",
    pregunta: "Curso de Programación Web",
    respuesta: "Certificado profesional de 480h sobre desarrollo Web (HTML, CSS, JS, Node.js, MongoDB). Requiere estar inscrito en Lanbide."
  },
  {
    categoria: "Cursos",
    tipo: "avanzado",
    nombre: "Dinamización Social a través de las TIC",
    horas: 500,
    modalidad: "Presencial",
    pregunta: "Curso Dinamización Social TIC",
    respuesta: "Formación orientada a la dinamización social e inclusión digital (500 horas)."
  }
];

async function sembrarBaseDatos() {
  try {
    const db = await connectDB();
    const coleccion = db.collection('conocimientos');
    await coleccion.deleteMany({});
    await coleccion.insertMany(todosLosConocimientos);
    console.log("¡Base de datos cargada correctamente con la estructura adaptada!");
    process.exit(0);
  } catch (error) {
    console.error("Error al cargar la base de datos:", error);
    process.exit(1);
  }
}

sembrarBaseDatos();