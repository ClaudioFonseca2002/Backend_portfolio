//Creo instancia de express
const express = require("express");
//Creo instancia express.Router para poder 'Enrutar los endPoints'
const router = express.Router();
const app = express();

//Importo funcion "ping" del controlador
const { ping } = require("../controllers/pingController.cjs");

//Creo endPoint
router.get("/ping", ping);

module.exports = router;
