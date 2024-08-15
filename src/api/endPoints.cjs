//Creo instancia de express
const express = require("express");
//Creo instancia express.Router para poder 'Enrutar los endPoints'
const router = express.Router();
const app = express();

//Importo funcion "ping" del controlador
const { ping } = require("../controllers/pingController.cjs");

//importo función "login" del controlador
const { login } = require("../controllers/loginController.cjs");

//Creo endPoint
router.get("/ping", ping);
router.post("/login", login);

module.exports = router;
