import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';

const todosLosConocimientos = [
  // INFORMACIÓN GENERAL Y CONTACTO 
  {
    categoria: "Información General",
    tipo: "institucional",
    pregunta: "¿Qué es Saregune?",
    respuesta: "Saregune es un proyecto comunitario de Sartu Álava en el Casco Viejo de Vitoria-Gasteiz. Promovemos el uso libre y gratuito de las TIC para la inclusión social y la dinamización del barrio. Más información en: https://www.saregune.net/es/que-es-saregune/",
    url: "https://www.saregune.net/es/que-es-saregune/"
  },
  {
    categoria: "Contacto",
    tipo: "contacto",
    pregunta: "¿Dónde está Saregune y cómo contactar?",
    respuesta: "Estamos en Saregune, en Cantón de Santa María, 4 (Vitoria-Gasteiz). Horario: lunes a viernes de 9:00 a 18:00. Teléfono: 945 03 99 81 | WhatsApp: 688 85 16 41. Correo (solo si lo solicitan): info@saregune.net. Puedes ver la ubicación exacta en Google Maps: https://www.google.com/maps/search/?api=1&query=Saregune+Canton+de+Santa+Maria+4+Vitoria-Gasteiz",
    url: "https://www.google.com/maps/search/?api=1&query=Saregune+Canton+de+Santa+Maria+4+Vitoria-Gasteiz"
  },
  {
    categoria: "Información General",
    tipo: "horario_centro",
    pregunta: "¿Qué horarios hay? ¿Cuál es el horario del centro? ¿A qué hora abre Saregune?",
    respuesta: "El centro está abierto de lunes a viernes, de 9:00 a 18:00. Estamos en Cantón de Santa María, 4, Vitoria-Gasteiz. Ver en Google Maps: https://www.google.com/maps/search/?api=1&query=Saregune+Canton+de+Santa+Maria+4+Vitoria-Gasteiz",
    url: "https://www.google.com/maps/search/?api=1&query=Saregune+Canton+de+Santa+Maria+4+Vitoria-Gasteiz"
  },

  // MENÚ GENERAL DE CURSOS Y REQUISITOS DE INSCRIPCIÓN
  {
    categoria: "Cursos",
    tipo: "menu_general",
    nombre: "Menú general de cursos",
    descripcion: "Ofrecemos formación totalmente gratuita: Cursos básicos, Formación avanzada / Lanbide y Formación a familias.",
    pregunta: "¿Qué tipo de cursos ofrecen?",
    respuesta: "Ofrecemos varias opciones gratuitas:\n1. Cursos básicos: Para aprender a usar el ordenador e internet.\n2. Formación avanzada: Cursos orientados al empleo (Lanbide).\n3. Formación a familias: Uso seguro de internet y herramientas escolares. Consulta toda la oferta en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "requisitos_inscripcion",
    nombre: "Requisitos de inscripción para Cursos Básicos",
    descripcion: "Información sobre los datos necesarios para inscribirse a los cursos básicos.",
    pregunta: "¿Qué requisitos se necesitan para inscribirse en los cursos básicos?",
    respuesta: "Para inscribirse en los cursos básicos solo se requiere proporcionar nombre, apellidos y número de teléfono. No se exige empadronamiento ni ninguna otra documentación.",
    inscripcion: "La inscripción es presencial en Saregune, en Cantón de Santa María, 4.",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },

  // CURSOS BÁSICOS (7 CURSOS INDEPENDIENTES Y EXACTOS)
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Iniciación a la informática",
    descripcion: "Para aprender a familiarizarse con el ordenador y adquirir conocimientos digitales básicos desde cero.",
    horarios: {
      octubre: ["09:00–10:15", "10:30–11:45", "13:30–14:45", "16:30–17:45"],
      noviembre: ["10:30–11:45", "12:00–13:15", "15:00–16:15", "18:00–19:15"],
      diciembre: ["10:30–11:45", "13:30–14:45", "16:30–17:45", "18:00–19:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Iniciación a la informática",
    respuesta: "Curso básico para aprender a usar el ordenador desde cero. Disponibilidad en octubre, noviembre y diciembre con varios horarios de mañana y tarde. Más detalles en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Procesador de textos",
    descripcion: "Aprende a redactar, editar y dar formato a documentos de texto como cartas o currículums.",
    horarios: {
      octubre: ["15:00–16:15"],
      noviembre: ["13:30–14:45"],
      diciembre: ["12:00–13:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Procesador de textos",
    respuesta: "Aprende a crear y formatear documentos de texto en ordenador. Consulta más información en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Hoja de cálculo",
    descripcion: "Aprende a organizar datos, gestionar tablas y realizar cálculos sencillos.",
    horarios: {
      octubre: ["15:00–16:15"],
      noviembre: ["13:30–14:45"],
      diciembre: ["12:00–13:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Hoja de cálculo",
    respuesta: "Curso dedicado al aprendizaje de tablas y hojas de cálculo para organizar información. Más detalles en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Multimedia online",
    descripcion: "Descubre herramientas digitales para visualizar, editar y gestionar contenidos multimedia en línea.",
    horarios: {
      octubre: ["12:00–13:15"],
      noviembre: ["09:00–10:15"],
      diciembre: ["15:00–16:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Multimedia online",
    respuesta: "Curso práctico para usar recursos multimedia en internet de forma sencilla. Más detalles en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Trámites fáciles",
    descripcion: "Aprende a realizar gestiones y trámites administrativos en línea con certificados digitales y BakQ.",
    horarios: {
      octubre: ["12:00–13:15"],
      noviembre: ["09:00–10:15"],
      diciembre: ["15:00–16:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Trámites fáciles",
    respuesta: "Realiza gestiones en internet de forma segura con certificado digital o BakQ. Consulta más detalles en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Recursos Google",
    descripcion: "Aprende a gestionar la nube con herramientas como Google Drive y Gmail.",
    horarios: {
      octubre: ["18:00–19:15"],
      noviembre: ["16:30–17:45"],
      diciembre: ["09:00–10:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Recursos Google",
    respuesta: "Aprende a utilizar las herramientas en la nube de Google como Drive y Gmail. Más detalles en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },
  {
    categoria: "Cursos",
    tipo: "basico",
    nombre: "Presentaciones",
    descripcion: "Aprende a diseñar y crear presentaciones digitales y diapositivas visuales atractivas.",
    horarios: {
      octubre: ["18:00–19:15"],
      noviembre: ["16:30–17:45"],
      diciembre: ["09:00–10:15"]
    },
    inscripcion: "La inscripción es presencial en Saregune (Cantón de Santa María, 4). Solo se necesita nombre, apellidos y teléfono (sin empadronamiento).",
    pregunta: "Curso Presentaciones",
    respuesta: "Curso práctico para aprender a crear diapositivas y presentaciones visuales. Más detalles en: https://www.saregune.net/es/cursos-presenciales/",
    url: "https://www.saregune.net/es/cursos-presenciales/"
  },

  // FORMACIÓN AVANZADA 
  {
    categoria: "Cursos",
    tipo: "avanzado",
    nombre: "Programación Web",
    certificado: "Certificado Profesional IFCD0210",
    horas: 480,
    horario: "Lunes a viernes de 9:00 a 14:00",
    requisitos: "Desempleo/mejora de empleo (Lanbide).",
    pregunta: "Curso de Programación Web",
    respuesta: "Certificado profesional de 480h sobre desarrollo Web (HTML, CSS, JS, Node.js, MongoDB). Requiere inscripción en Lanbide. Más detalles e inscripciones en: https://www.saregune.net/es/curso-programacion-web/",
    url: "https://www.saregune.net/es/curso-programacion-web/"
  },
  {
    categoria: "Cursos",
    tipo: "avanzado",
    nombre: "Dinamización Social a través de las TIC",
    horas: 500,
    modalidad: "Presencial",
    pregunta: "Curso Dinamización Social TIC",
    respuesta: "Formación orientada a la dinamización social e inclusión digital (500 horas). Consulta los requisitos en: https://www.saregune.net/es/curso-dinamizacion-social-a-traves-de-las-nuevas-tecnologias/",
    url: "https://www.saregune.net/es/curso-dinamizacion-social-a-traves-de-las-nuevas-tecnologias/"
  },

  // FORMACIÓN A FAMILIAS Y BLOG FAMILIKLIK 
  {
    categoria: "Cursos",
    tipo: "familias",
    nombre: "Formación a Familias y Acompañamiento Digital",
    descripcion: "Talleres y recursos pensados para madres, padres y tutores sobre el uso responsable de la tecnología y herramientas educativas.",
    pregunta: "¿Tienen formación para familias o padres/madres?",
    respuesta: "Sí, ofrecemos talleres sobre parentalidad digital, uso seguro de redes sociales e internet para menores y uso de plataformas escolares. Puedes ver todos los recursos en: https://www.saregune.net/es/category/formacion-a-familias/",
    url: "https://www.saregune.net/es/category/formacion-a-familias/"
  },
  {
    categoria: "Blog",
    tipo: "blog_familias",
    nombre: "FamiliKLIK",
    descripcion: "Espacio con publicaciones y artículos dedicados al uso seguro de internet, redes sociales y convivencia digital en familia.",
    pregunta: "¿Qué es FamiliKLIK?",
    respuesta: "FamiliKLIK es una categoría de nuestro blog orientada a dar consejos y recursos sobre tecnología para familias. Puedes leer las publicaciones en: https://www.saregune.net/es/category/blog-es/familiklik/",
    url: "https://www.saregune.net/es/category/blog-es/familiklik/"
  },

  // RECURSOS Y HERRAMIENTAS 
  {
    categoria: "Recursos",
    tipo: "materiales_tic",
    nombre: "Recursos y Materiales TIC",
    descripcion: "Guías, manuales y materiales educativos sobre informática y tecnología para el aprendizaje autónomo.",
    pregunta: "¿Dónde encuentro recursos y materiales TIC para aprender?",
    respuesta: "Disponemos de una sección con guías y recursos didácticos sobre tecnología. Puedes consultarlos en: https://www.saregune.net/es/recursos-y-materiales-tic/",
    url: "https://www.saregune.net/es/recursos-y-materiales-tic/"
  },
  {
    categoria: "Recursos",
    tipo: "digital_tresnak",
    nombre: "Digital Tresnak",
    descripcion: "Recopilación de herramientas digitales útiles, programas de software libre y recursos web recomendados.",
    pregunta: "¿Qué es Digital Tresnak y qué herramientas digitales ofrecen?",
    respuesta: "Digital Tresnak es nuestra selección de herramientas digitales y aplicaciones recomendadas para el trabajo cotidiano y la e-inclusión. Accede en: https://www.saregune.net/es/digital-tresnak/",
    url: "https://www.saregune.net/es/digital-tresnak/"
  },

  // PROYECTOS COMUNITARIOS 
  {
    categoria: "Proyectos",
    tipo: "proyectos_generales",
    nombre: "Nuestros Proyectos",
    descripcion: "Iniciativas comunitarias y de dinamización social a través de la tecnología en Vitoria-Gasteiz.",
    pregunta: "¿Qué proyectos realiza Saregune?",
    respuesta: "Desarrollamos varios proyectos comunitarios para promover la inclusión digital y la cohesión social. Descúbrelos todos en: https://www.saregune.net/es/nuestros-proyectos/",
    url: "https://www.saregune.net/es/nuestros-proyectos/"
  },
  {
    categoria: "Proyectos",
    tipo: "portal_asociativo",
    nombre: "Elkarteak.org - Portal Asociativo",
    descripcion: "Plataforma de apoyo para las asociaciones y entidades del ámbito social, facilitando herramientas digitales e información comunitaria.",
    pregunta: "¿Qué es Elkarteak.org o el Portal Asociativo?",
    respuesta: "Elkarteak.org es un portal que apoya el tejido asociativo del barrio y de Vitoria-Gasteiz con herramientas y recursos digitales. Más info en: https://www.saregune.net/es/elkarteak-org-portal-asociativo/",
    url: "https://www.saregune.net/es/elkarteak-org-portal-asociativo/"
  },
  {
    categoria: "Proyectos",
    tipo: "television_barrio",
    nombre: "Auzo.tv - Televisión del barrio",
    descripcion: "Canal comunitario de televisión e iniciativas audiovisuales creadas por y para la comunidad del barrio.",
    pregunta: "¿Qué es Auzo.tv?",
    respuesta: "Auzo.tv es la televisión comunitaria del Casco Viejo de Vitoria-Gasteiz, un canal para visibilizar proyectos del barrio. Visita la web en: https://www.saregune.net/es/auzo-tv-television-del-barrio/",
    url: "https://www.saregune.net/es/auzo-tv-television-del-barrio/"
  },

  // BLOG Y VOLUNTARIADO 
  {
    categoria: "Blog",
    tipo: "voluntariado",
    nombre: "BLOGuntariado",
    descripcion: "Noticias, experiencias e información sobre el voluntariado informático y comunitario en Saregune.",
    pregunta: "¿Qué es BLOGuntariado o cómo funciona el voluntariado?",
    respuesta: "BLOGuntariado es el espacio de nuestro blog dedicado a visibilizar la labor del voluntariado y contar historias de participación comunitaria. Infórmate en: https://www.saregune.net/es/category/bloguntariado/",
    url: "https://www.saregune.net/es/category/bloguntariado/"
  }
];

async function sembrarBaseDatos() {
  try {
    const db = await connectDB();
    const coleccion = db.collection('conocimientos');
    await coleccion.deleteMany({});
    await coleccion.insertMany(todosLosConocimientos);
    console.log("¡Base de datos actualizada correctamente con los 7 cursos básicos exactos!");
    process.exit(0);
  } catch (error) {
    console.error("Error al cargar la base de datos:", error);
    process.exit(1);
  }
}

sembrarBaseDatos();