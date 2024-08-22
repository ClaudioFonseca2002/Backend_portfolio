// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;; // Cambia esto por tu clave secreta real

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Si no hay token, responde con 401

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Si hay un error al verificar, responde con 403
    req.user = user; // Guarda la información del usuario en la solicitud
    next(); // Pasa al siguiente middleware o controlador
  });
};

module.exports = authenticateToken;