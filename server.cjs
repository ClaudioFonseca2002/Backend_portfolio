require("dotenv").config(); // Cargar variables de entorno desde .env

//Servidor BackEnd
const connection = require("./src/models/database.cjs");

//Creo instancia express
const express = require("express");
const app = express();

//Interpretar JSON's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Defino numero de puerto del servidor local
const port = process.env.PORT;

//Traigo los endPoints de la API (LA API SE CONECTA CON EL CONTROLADOR)
const routes = require("./src/api/endPoints.cjs");

//Usar cors para evitar conflictos de comunicacion
const cors = require("cors");
app.use(
  cors({
    //Ruta del FrontEnd
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Include PUT in the allowed methods
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Hola desde el servidor");

app.use("/", routes);
