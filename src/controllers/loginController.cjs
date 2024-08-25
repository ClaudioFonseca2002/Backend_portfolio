const bcrypt = require('bcrypt');
const connection = require("../models/database.cjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

// Función para generar un JWT con un tiempo de expiración de 30 minutos (1800 segundos)
function generateToken(user) {
  const payload = {
    user: user,
    exp: Math.floor(Date.now() / 1000) + 60 * 1, // Expira en 30 minutos
  };

  return jwt.sign(payload, secretKey);
}

module.exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM login WHERE username = ?";

  connection.query(query, [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }

    if (result.length > 0) {
      const user = result[0];

      // Compara la contraseña proporcionada con el hash almacenado
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error comparing passwords');
        }

        if (isMatch) {
          // Genera el token
          const token = generateToken({ id: user.id, username: user.username });
          res.status(200).json({ token });
          console.log("Se ha generado token");
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};