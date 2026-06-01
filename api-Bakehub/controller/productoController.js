const Producto = require("../models/productoMode");

class ProductoController {
  static async createProducto(req, res) {
    try {
      const producto = new Producto(req.body);
      const productoGuardado = await producto.save();

      return res.status(201).json({
        ok: true,
        message: "Producto creado correctamente",
        producto: productoGuardado,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al crear producto",
        error: error.message,
      });
    }
  }

  static async buscarProductos(req, res) {
    try {
      const productos = await Producto.find().sort({ createdAt: -1 });

      return res.status(200).json({
        ok: true,
        productos,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al buscar productos",
        error: error.message,
      });
    }
  }

  static async eliminarProducto(req, res) {
    try {
      const { id } = req.params;

      const productoEliminado = await Producto.findByIdAndDelete(id);

      if (!productoEliminado) {
        return res.status(404).json({
          ok: false,
          message: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Producto eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al eliminar producto",
        error: error.message,
      });
    }
  }

  static async editarProducto(req, res) {
    try {
      const { id } = req.params;

      const productoEditado = await Producto.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!productoEditado) {
        return res.status(404).json({
          ok: false,
          message: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Producto editado correctamente",
        producto: productoEditado,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al editar producto",
        error: error.message,
      });
    }
  }
}

module.exports = ProductoController;