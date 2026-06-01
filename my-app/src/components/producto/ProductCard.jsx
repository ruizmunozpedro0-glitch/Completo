import React from "react";

export function ProductCard({ producto, onAgregarCarrito }) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Imagen del producto */}
      <img
        src={
          producto.imagen ||
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
        }
        alt={producto.nombre}
        className="w-full h-48 object-cover"
      />

      {/* Información del producto */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-xl font-bold text-gray-800">
            {producto.nombre}
          </h2>

          <span className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
            {producto.categoria}
          </span>
        </div>

        <p className="text-gray-600 text-sm">
          {producto.descripcion}
        </p>

        <p className="text-2xl font-bold text-pink-700">
          ${producto.precio}
        </p>

        {producto.disponible ? (
          <button
            onClick={() => onAgregarCarrito(producto)}
            className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition-all duration-300"
          >
            Agregar al carrito
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl cursor-not-allowed"
          >
            No disponible
          </button>
        )}
      </div>
    </article>
  );
}