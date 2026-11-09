const express = require('express');
const cors = require('cors');
const app = express();

// Permite que tu frontend se comunique con tu backend
app.use(cors());
app.use(express.json());

// Esta es nuestra primera ruta de prueba
app.get('/api', (req, res) => {
  res.json({ mensaje: "¡El backend de la Wiki Azure de Seguridad está vivo!" });
});

// Súper importante para Vercel: exportamos la app en vez de usar app.listen
module.exports = app;