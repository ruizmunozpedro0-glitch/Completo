const express = require("express");
const ProductoController = require("../controller/productoController");

const api = express.Router();

api.post("/create", ProductoController.createProducto);
api.get("/buscar", ProductoController.buscarProductos);
api.delete("/eliminar/:id", ProductoController.eliminarProducto);
api.put("/editar/:id", ProductoController.editarProducto);

module.exports = api;