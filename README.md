# Saregune Chatbot

## Descripción

Saregune Chatbot es una aplicación web desarrollada con Node.js y Express que permite interactuar con un asistente virtual para responder preguntas sobre la asociación, sus actividades y servicios.El sistema incluye una interfaz pública para usuarios y una vista administrativa para gestionar la base de conocimientos.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- JavaScript
- HTML
- CSS personalizado (estilos)

## Funcionalidades

- Chat interactivo con el usuario
- Respuestas basadas en conocimientos almacenados
- Administración de información del chatbot
- Carga inicial de datos mediante seed
- Integración con servicios de IA

## Estructura del proyecto

```bash
saregune-chatbot/
├── index.js
├── package.json
├── seed.js
├── README.md
├── public/
│   ├── admin.html
│   ├── front.js
│   ├── index.html
│   ├── styles.css
│   └── assets/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── chatController.js
│   │   └── conocimientosController.js
│   ├── models/
│   │   └── conocimiento.js
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   └── conocimientosRoutes.js
│   └── services/
│       └── ia.js
```

## Requisitos previos

- Node.js instalado
- MongoDB en ejecución
- npm

## Instalación

1. Clona este repositorio.
2. Accede a la carpeta del proyecto:

```bash
cd saregune-chatbot
```

3. Instala las dependencias:

```bash
npm install
```

4. Configura la conexión a MongoDB en el archivo `src/config/db.js`.
5. Ejecuta la base de datos inicial con:

```bash
node seed.js
```

6. Inicia la aplicación:

```bash
node index.js
```

## Uso

- Abre el navegador y entra a la interfaz principal.
- Usa el chatbot para realizar preguntas.
- En la parte administrativa puedes gestionar la información disponible para el asistente.

## Integración con Groq

Este proyecto usa Groq como proveedor de IA para responder las consultas del chatbot.

## Variables de entorno

Si tu proyecto usa variables de entorno, puedes crear un archivo `.env` con configuraciones como:

```bash
PORT=3000
MONGODB_URI=tu_url_de_mongo
AI_API_KEY=tu_clave
```

## Estado del proyecto

Proyecto en desarrollo.

## Autor

Saregune Chatbot

## Licencia

Este proyecto se distribuye bajo una licencia de uso académico y personal.

---

### Notas

Este README puede adaptarse según el avance real del proyecto, agregando más detalles técnicos, capturas de pantalla o instrucciones específicas del despliegue.
