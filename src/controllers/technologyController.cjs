const connection = require("../models/database.cjs");
const express = require("express");

// Obtener formaciones terminadas
exports.getTechnology = (req, res) => {
  // Realiza una consulta a la base de datos
  connection.query("SELECT * FROM tecnologia", (error, results) => {
    if (error) {
      throw error;
    }
    // Devuelve los datos como respuesta
    res.json(results);
  });
};

exports.addTechnology = (req, res) => {
  const nameTechnology = req.body.nameTechnology;
  const percentage = req.body.percentage;

  const query =
    "INSERT INTO  `tecnologia` (`nombre_tecnologia`,`porcentaje`) VALUES (?,?)";
  connection.query(query, [nameTechnology, percentage], (error, results) => {
    if (error) throw error;
    res.json({ message: "Proyecto agregado correctamente" });
  });
};

exports.deleteTechnology = (req, res) => {
  const idTechnology = req.params.idTechnology;
  connection.query('DELETE FROM tecnologia WHERE id_tecnologia = ?', idTechnology, (error, result) => {
    if (error) {
      console.error('Error al eliminar técnologia:', error);
      res.json({ error: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Técnologia eliminada correctamente' });
    }
  });
};
