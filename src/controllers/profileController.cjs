const connection = require("../models/database.cjs");
const express = require("express");

// Controlador para obtenerDescripcionPerfil
exports.getProfile = (req, res) => {
  const query = "SELECT * FROM perfil";
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener descripcionPerfil" });
    } else {
      res.json(results);
    }
  });
};

// Controlador para modificar descripción del perfil
exports.modifyDescription = (req, res) => {
  const id_profile = req.params.id_profile;
  const newDescription = req.body.newDescription; // Suponiendo que recibes el nuevo dato en el cuerpo de la solicitud
  console.log("id_profile: " + id_profile);

  try {
    // Realiza la actualización en la base de datos
    connection.query(
      "UPDATE perfil SET perfil_descripcion = ? WHERE id_perfil = ?",
      [newDescription, id_profile]
    );
    res.send("Nueva descripción recibida correctamente");
  } catch (error) {
    console.error("Error al actualizar el dato:", error);
    res.send("Error interno del servidor");
  }
};
