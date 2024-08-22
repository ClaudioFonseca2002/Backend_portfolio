const connection = require("../models/database.cjs");
const express = require("express");

// Obtener formaciones terminadas
exports.getProyect = (req, res) => {
  // Realiza una consulta a la base de datos
  connection.query("SELECT * FROM proyecto", (error, results) => {
    if (error) {
      throw error;
    }
    // Devuelve los datos como respuesta
    res.json(results);
  });
};

exports.addProyect = (req, res) => {
  const nameProyect = req.body.nameProyect;
  const description = req.body.description;
  const link = req.body.link;

  const query =
    "INSERT INTO  `proyecto` (`nombre_proyecto`,`descripcion`,`enlace`) VALUES (?, ?, ?)";
  connection.query(
    query,
    [nameProyect, description, link],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "Proyecto agregado correctamente" });
    }
  );
};

exports.deleteProyect = (req, res) => {
  const id_proyecto = req.params.id_proyecto;
  console.log(id_proyecto)
  connection.query('DELETE FROM proyecto WHERE id_proyecto = ?', id_proyecto, (error, result) => {
    if (error) {
      console.error('Error al eliminar proyecto:', error);
      res.json({ error: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Proyecto eliminado correctamente' });
    }
  });
};
