//Creo instancia de express
const express = require("express");
//Creo instancia express.Router para poder 'Enrutar los endPoints'
const router = express.Router();
const app = express();
//Importo autenticadorDeToken
const authenticateToken = require('../utils/authMiddleware.cjs');


//Importo funcion "ping" del controlador
const { ping } = require("../controllers/pingController.cjs");

//importo función "login" del controlador
const { login } = require("../controllers/loginController.cjs");

//Importo controladores de perfil
const { getProfile } = require("../controllers/profileController.cjs");
const { modifyDescription } = require("../controllers/profileController.cjs");

//Creo endPoint
router.get("/ping", ping);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/modifyDescription/:id_profile", authenticateToken ,modifyDescription);

module.exports = router;
