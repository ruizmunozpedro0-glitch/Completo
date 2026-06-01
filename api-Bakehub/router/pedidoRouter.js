const express = require("express");
const PedidoController = require("../controller/pedidoController");

const api = express.Router();

api.post("/create", PedidoController.createPedido);
api.get("/buscar", PedidoController.buscarPedidos);

module.exports = api;