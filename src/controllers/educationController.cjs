const connection = require("../models/database.cjs");
const express = require("express");

// Obtener formaciones terminadas
exports.getCompletedEducation = (req, res) => {
  // Realiza una consulta a la base de datos
  connection.query("SELECT * FROM educacion_finalizada", (error, results) => {
    if (error) {
      throw error;
    }
    // Devuelve los datos como respuesta
    res.json(results);
  });
};

// Obtener Formaciones en proceso
exports.getEducationInProcess = (req, res) => {
  // Realiza una consulta a la base de datos
  connection.query('SELECT * FROM educacion_proceso', (error, results) => {
    if (error) {
      throw error;
    }
    // Devuelve los datos como respuesta
    res.json(results);
  });
};

// Eliminar formaciones terminadas
exports.deleteCompletedEducation = (req, res) => {
  const id_education = req.params.id_education;
  connection.query('DELETE FROM educacion_finalizada WHERE id_educacion = ?', id_education, (error, result) => {
    if (error) {
      console.error('Error al eliminar educación:', error);
      res.json({ error: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Registro eliminado correctamente' });
    }
  });
};

// Eliminar formaciones en proceso
exports.deleteEducationInProcess = (req, res) => {
  const id_educacion_proceso = req.params.id_educacion_proceso;
  connection.query('DELETE FROM educacion_proceso WHERE id_educacion_proceso = ?', id_educacion_proceso, (error, result) => {
    if (error) {
      console.error('Error al eliminar educación:', error);
      res.json({ error: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Registro eliminado correctamente' });
    }
  });
};

// Agregar formaciones terminadas
exports.addCompletedEducation = (req, res) => {
  const educationName = req.body.educationName;
  const institution = req.body.institution;
  const until = req.body.until;

  console.log(
    "BACK( " + educationName + ", " + institution + ", " + until + ")"
  );
  const query =
    "INSERT INTO  `educacion_finalizada` (`nombreEducacion`,`institucion`, hasta) VALUES (?, ?, ?)";
  connection.query(
    query,
    [educationName, institution, until],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "Educación finalizada agregada correctamente" });
    }
  );
};

// Agregar formaciones en proceso
exports.addInProcessEducation = (req, res) => {
  const educationName = req.body.educationName;
  const institution = req.body.institution;
  const start = req.body.start;

  const query =
    "INSERT INTO  `educacion_proceso` (`nombreEducacion`,`institucion`,inicio) VALUES (?, ?, ?)";
  connection.query(
    query,
    [educationName, institution, start],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "Educación proceso agregada correctamente" });
    }
  );
};
