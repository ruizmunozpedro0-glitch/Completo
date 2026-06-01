const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    productos: [
      {
        productoId: {
          type: String,
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    metodoPago: {
      type: String,
      enum: ["Efectivo", "Transferencia"],
      default: "Efectivo",
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pedido", pedidoSchema);