import React from "react";

export function Producto({ item, onEliminar, onAumentar, onDisminuir }) {
  const idProducto = item.id || item._id;

  const limpiarNombreProducto = (nombre) => {
    return nombre.replace(/\s*x\d+$/i, "");
  };

  return (
    <article className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-4">
      <img
        src={
          item.imagen ||
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
        }
        alt={limpiarNombreProducto(item.nombre)}
        className="w-full sm:w-32 h-32 object-cover rounded-xl"
      />

      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800">
          {limpiarNombreProducto(item.nombre)}
        </h3>

        <p className="text-gray-600 text-sm">{item.descripcion}</p>

        <p className="text-pink-700 font-bold mt-2">
          Precio: {item.precio} Pesos
        </p>

        <p className="font-bold text-gray-800">
          Subtotal: {item.precio * item.cantidad} $
        </p>
      </div>

      <div className="flex sm:flex-col items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onDisminuir(idProducto)}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            -
          </button>

          <span className="font-bold">{item.cantidad}</span>

          <button
            type="button"
            onClick={() => onAumentar(idProducto)}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => onEliminar(idProducto)}
          className="text-red-500 text-sm hover:underline"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}