dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import basicAuth from 'express-basic-auth';

import conocimientosRoutes from './src/routes/conocimientosRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js'; // creado por lili



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuración de autenticación básica para el panel de administración
const autenticacionAdmin = basicAuth({
    users: { 
        // Usuario y contraseña obtenidos desde las variables de(.env)
        'admin': process.env.ADMIN_PASSWORD
    },
    challenge: true, // Muestra la ventana emergente de inicio de sesión del navegador
    unauthorizedResponse: 'Acceso no autorizado al panel de administración.'
});

// Proteger la ruta limpia /admin y el archivo físico admin.html
app.get('/admin', autenticacionAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/admin.html', autenticacionAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Servir el resto de archivos estáticos (CSS, JS del cliente, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API (Basma - CRUD Admin y lectura de conocimientos)
app.use('/api', conocimientosRoutes);

// Ruta de chat (Lili)
app.use('/api', chatRoutes);

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});