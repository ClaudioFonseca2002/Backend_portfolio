require('dotenv').config(); // Cargar variables de entorno desde .env

const express = require('express');
const cors = require('cors');
const app = express();

// Configura el puerto
const port = process.env.PORT || 3000;

// Define los orígenes permitidos
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS 

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const routes = require('./src/api/endPoints.cjs');
app.use('/', routes);

// Manejo de errores
app.use((err, req, res, next) => {
  if (err.message === 'No permitido por CORS') {
    res.status(403).json({ message: 'Acceso denegado por CORS' });
  } else {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  }
});

// Inicializa el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});