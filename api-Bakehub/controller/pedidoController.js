const Pedido = require("../models/pedidoMode");

class PedidoController {
  static async createPedido(req, res) {
    try {
      const pedido = new Pedido(req.body);
      const pedidoGuardado = await pedido.save();

      return res.status(201).json({
        ok: true,
        message: "Pedido creado correctamente",
        pedido: pedidoGuardado,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al crear pedido",
        error: error.message,
      });
    }
  }

  static async buscarPedidos(req, res) {
    try {
      const pedidos = await Pedido.find().sort({ createdAt: -1 });

      return res.status(200).json({
        ok: true,
        pedidos,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al buscar pedidos",
        error: error.message,
      });
    }
  }
}

module.exports = PedidoController;