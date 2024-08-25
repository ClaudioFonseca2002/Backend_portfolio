//Creo instancia de express
const express = require("express");
//Creo instancia express.Router para poder 'Enrutar los endPoints'
const router = express.Router();
const app = express();
//Importo autenticadorDeToken
const authenticateToken = require("../utils/authMiddleware.cjs");

//Importo funcion "ping" del controlador
const { ping } = require("../controllers/pingController.cjs");

//importo función "login" del controlador
const { login } = require("../controllers/loginController.cjs");

//Importo controladores de perfil
const { getProfile } = require("../controllers/profileController.cjs");
const { modifyDescription } = require("../controllers/profileController.cjs");

//Importo controladores de educacion
const {
  getCompletedEducation,
} = require("../controllers/educationController.cjs");
const {
  getEducationInProcess,
} = require("../controllers/educationController.cjs");
const {
  deleteCompletedEducation,
} = require("../controllers/educationController.cjs");
const {
  deleteEducationInProcess,
} = require("../controllers/educationController.cjs");
const {
  addCompletedEducation,
} = require("../controllers/educationController.cjs");
const {
  addInProcessEducation,
} = require("../controllers/educationController.cjs");

//Importo los controladores de proyecto
const { getProyect } = require("../controllers/proyectController.cjs");
const { addProyect } = require("../controllers/proyectController.cjs");
const { deleteProyect } = require("../controllers/proyectController.cjs");

//Importo los controladores de tecnologia
const { getTechnology } = require("../controllers/technologyController.cjs");
const { addTechnology } = require("../controllers/technologyController.cjs");
const { deleteTechnology } = require("../controllers/technologyController.cjs");

//Creo endPoint
router.get("/ping", ping);
router.post("/login", login);
router.get("/profile", getProfile);
router.put(
  "/modifyDescription/:id_profile",
  authenticateToken,
  modifyDescription
);

//Educación
router.get("/getCompletedEducation", getCompletedEducation);
router.get("/getEducationInProcess", getEducationInProcess);
router.delete(
  "/deleteCompletedEducation/:id_education",
  authenticateToken,
  deleteCompletedEducation
);
router.delete(
  "/deleteEducationInProcess/:id_educacion_proceso",
  authenticateToken,
  deleteEducationInProcess
);
router.post("/addCompletedEducation", authenticateToken, addCompletedEducation);
router.post("/addInProcessEducation", authenticateToken, addInProcessEducation);

//Proyecto
router.get("/getProyects", getProyect);
router.post("/addProyect", authenticateToken, addProyect);
router.delete("/deleteProyect/:id_proyecto", authenticateToken, deleteProyect);

//Tecnologia
router.get("/getTechnology", getTechnology);
router.post("/addTechnology", authenticateToken, addTechnology);
router.delete("/deleteTechnology/:idTechnology", authenticateToken, deleteTechnology);

module.exports = router;
