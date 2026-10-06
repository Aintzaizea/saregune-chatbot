
 import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';

const todosLosConocimientos = [
  //  INFORMACIÓN GENERAL Y SOBRE SAREGUNE 
  {
    categoria: "Información General",
    pregunta: "¿Qué es Saregune y cuál es su objetivo?",
    respuesta: "Saregune es un proyecto comunitario de la asociación Sartu Álava, ubicado en el Casco Viejo de Vitoria-Gasteiz desde 2002. Nuestro objetivo es promover el uso libre y gratuito de las Tecnologías de la Información y Comunicación (TIC) para fomentar la inclusión social, la participación ciudadana y dinamizar el barrio."
  },
  {
    categoria: "Información General",
    pregunta: "¿Qué hacemos en Saregune y qué servicios ofrecemos?",
    respuesta: "En Saregune ofrecemos: 1) Cursos y talleres de alfabetización digital y programación. 2) Apoyo tecnológico a asociaciones del barrio. 3) Uso y promoción de Software Libre. Para estar al día de todas nuestras novedades y nuevos cursos, puedes unirte a nuestro canal de WhatsApp: https://www.whatsapp.com/channel/0029Vb3noFa4yltHuQwIvI1g"
  },

  //  UBICACIÓN, HORARIOS Y CONTACTO 
  {
    categoria: "Contacto y Ubicación",
    pregunta: "¿Dónde está ubicada la oficina de Saregune?",
    respuesta: "Estamos ubicados en el Casco Viejo de Vitoria-Gasteiz, en Cantón de Santa María, 4 (01001 Vitoria-Gasteiz)."
  },
  {
    categoria: "Contacto y Ubicación",
    pregunta: "¿Cuáles son los horarios de atención de Saregune?",
    respuesta: "Atendemos de lunes a viernes por las mañanas de 9:00 a 18:00."
  },
  {
    categoria: "Contacto y Ubicación",
    pregunta: "¿Cuál es el teléfono, WhatsApp y canales de contacto de Saregune?",
    respuesta: "Puedes contactarnos por teléfono al 945 03 99 81 o por WhatsApp al 688 85 16 41. Si solo necesitas nuestro correo electrónico, es info@saregune.net. Además, síguenos en nuestro canal de WhatsApp para conocer cursos y novedades: https://www.whatsapp.com/channel/0029Vb3noFa4yltHuQwIvI1g"
  },
  {
    categoria: "Inscripciones",
    pregunta: "¿Cómo me puedo inscribir en los cursos?",
    respuesta: "La inscripción se realiza de manera presencial en Cantón de Santa María, 4, o llamando al teléfono 945 03 99 81 / WhatsApp 688 85 16 41."
  },

  //  CURSOS Y PROGRAMACIÓN TRIMESTRAL (OCTUBRE - DICIEMBRE 2026) Y CERTIFICADOS 
  {
    categoria: "Cursos Trimestrales",
    pregunta: "¿Se entrega certificado en los cursos presenciales/básicos (Octubre - Diciembre 2026)?",
    respuesta: "SÍ, existe la posibilidad de obtener un certificado para los cursos. Para más información sobre los requisitos del certificado, por favor contáctanos por teléfono al 945 03 99 81 o por WhatsApp al 688 85 16 41. Puedes consultar los cursos presenciales en: https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos Trimestrales",
    pregunta: "¿Qué cursos hay en Octubre de 2026?",
    respuesta: "En octubre de 2026 ofrecemos: Iniciación a la informática (9:00-10:15, 10:30-11:45, 13:30-14:45, 16:30-17:45), Multimedia online y Trámites fáciles (12:00-13:15), Hoja de cálculo y Procesador de textos (15:00-16:15), Recursos Google y Presentaciones (18:00-19:15). Para más información contáctanos por teléfono/WhatsApp y visita: https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos Trimestrales",
    pregunta: "¿Qué cursos hay en Noviembre de 2026?",
    respuesta: "En noviembre de 2026 ofrecemos: Multimedia online y Trámites fáciles (9:00-10:15), Iniciación a la informática (10:30-11:45, 12:00-13:15, 15:00-16:15, 18:00-19:15), Procesador de textos y Hoja de cálculo (13:30-14:45), Presentaciones y Recursos Google (16:30-17:45). Para más información contáctanos por teléfono/WhatsApp y visita: https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos Trimestrales",
    pregunta: "¿Qué cursos hay en Diciembre de 2026?",
    respuesta: "En diciembre de 2026 ofrecemos: Recursos Google y Presentaciones (9:00-10:15), Iniciación a la informática (10:30-11:45, 13:30-14:45, 16:30-17:45, 18:00-19:15), Procesador de textos y Hoja de cálculo (12:00-13:15), Multimedia online y Trámites fáciles (15:00-16:15). Para más información contáctanos por teléfono/WhatsApp y visita: https://www.saregune.net/es/cursos-presenciales/"
  },
  //  FORMACIÓN AVANZADA, LANBIDE Y PROGRAMACIÓN WEB 
  {
    categoria: "Formación de Lanbide",
    pregunta: "¿Qué formaciones de Lanbide ofrece Saregune y cuál es el certificado de Programación Web?",
    respuesta: "Saregune ofrece dos formaciones gratuitas de Lanbide orientadas al empleo: 1) Curso de 'Programación Web' con Certificado Profesional IFCD0210 (480 horas presenciales). 2) 'Dinamización Social a través de las TIC' (500 horas presenciales). Para todos los detalles sobre el curso de Programación Web, contenidos y requisitos, consulta el siguiente enlace: https://www.saregune.net/es/curso-programacion-web/ . Para más información de la oferta de informática de Lanbide visita: https://www.saregune.net/es/cursos-informatica/"
  },

  //  PROYECTOS, FAMILIAS Y RECURSOS DIGITALES 
  {
    categoria: "Proyectos y Comunidad",
    pregunta: "¿Qué proyectos desarrolla Saregune y dónde puedo verlos?",
    respuesta: "Desarrollamos proyectos comunitarios y de inclusión digital. Puedes ver la lista completa en: https://www.saregune.net/es/nuestros-proyectos/"
  },
  {
    categoria: "Proyectos y Comunidad",
    pregunta: "¿Tienen formación tecnológica para familias?",
    respuesta: "Sí, realizamos capacitaciones para familias enfocadas en el uso seguro de internet y herramientas escolares. Más información en: https://www.saregune.net/es/category/formacion-a-familias/"
  },
  {
    categoria: "Proyectos y Comunidad",
    pregunta: "¿Qué es 'Digital Tresnak'?",
    respuesta: "Es un repositorio donde compartimos herramientas digitales útiles y recursos libres. Consúltalo en: https://www.saregune.net/es/digital-tresnak/"
  },

  //  DOCUTECA (MEMORIAS, HEMEROTECA Y BLOG) 
  {
    categoria: "Recursos y Docuteca",
    pregunta: "¿Dónde puedo consultar la hemeroteca, memorias de gestión y blog de Saregune?",
    respuesta: "En nuestra sección de Docuteca puedes acceder a la Hemeroteca (https://www.saregune.net/es/hemeroteca/), las Memorias anuales (https://www.saregune.net/es/memorias/) y nuestro Blog oficial (https://www.saregune.net/es/category/blog-es/)."
  }
];

async function sembrarBaseDatos() {
  try {
    const db = await connectDB();
    const coleccion = db.collection('conocimientos');

    await coleccion.deleteMany({});
    await coleccion.insertMany(todosLosConocimientos);

    console.log("¡Base de datos inicializada correctamente en MongoDB con todos los enlaces y datos específicos!");
    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
    process.exit(1);
  }
}

sembrarBaseDatos();