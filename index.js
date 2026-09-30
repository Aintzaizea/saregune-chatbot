// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import conocimientosRoutes from './src/routes/conocimientosRoutes.js';
// //import chatRoutes from './src/routes/chatRoutes.js';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../public')));

// // Rutas de la API
// app.use('/api', conocimientosRoutes);
// //app.use('/api', chatRoutes);

// app.listen(PORT, () => {
//     console.log(` Servidor listo en http://localhost:${PORT}`);
// });