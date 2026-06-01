import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function FormProducto({
  onAgregarProducto,
  onEditarProducto,
  productoEditar,
  cancelarEdicion,
}) {
  const productoInicial = {
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: "",
    disponible: true,
  };

  const [producto, setProducto] = useState(productoInicial);

  const categorias = [
    "Pasteles",
    "Cupcakes",
    "Waffles",
    "Postres",
    "Bebidas",
  ];

  useEffect(() => {
    if (productoEditar) {
      setProducto({
        nombre: productoEditar.nombre || "",
        descripcion: productoEditar.descripcion || "",
        precio: productoEditar.precio || "",
        categoria: productoEditar.categoria || "",
        imagen: productoEditar.imagen || "",
        disponible: productoEditar.disponible ?? true,
      });
    } else {
      setProducto(productoInicial);
    }
  }, [productoEditar]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;

    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (
      producto.nombre === "" ||
      producto.descripcion === "" ||
      producto.precio === "" ||
      producto.categoria === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Debe llenar todos los campos obligatorios.",
      });

      return;
    }

    if (Number(producto.precio) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Precio inválido",
        text: "El precio debe ser mayor a 0.",
      });

      return;
    }

    const productoEnviar = {
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio: Number(producto.precio),
  categoria: producto.categoria,
  imagen: producto.imagen,
  disponible: producto.disponible,
};

    if (productoEditar) {
      onEditarProducto(productoEnviar);
    } else {
      onAgregarProducto(productoEnviar);
    }

    setProducto(productoInicial);
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="bg-white rounded-2xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {productoEditar ? "Editar producto" : "Agregar producto"}
      </h2>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">
          Nombre del producto
        </label>

        <input
          type="text"
          name="nombre"
          placeholder="Ejemplo: Pastel de chocolate"
          value={producto.nombre}
          onChange={manejarCambio}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">
          Descripción
        </label>

        <textarea
          name="descripcion"
          placeholder="Describe el producto, ingredientes o sabor..."
          value={producto.descripcion}
          onChange={manejarCambio}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400 min-h-28"
        ></textarea>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">
          Precio
        </label>

        <input
         type="number"
  name="precio"
  placeholder="Ejemplo: 120"
  value={producto.precio}
  onChange={manejarCambio}
  onWheel={(e) => e.target.blur()}
  min="1"
  step="1"
  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
  />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">
          Categoría
        </label>

        <select
          name="categoria"
          value={producto.categoria}
          onChange={manejarCambio}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">Selecciona una categoría</option>

          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">
          URL de imagen
        </label>

        <input
          type="text"
          name="imagen"
          placeholder="Pega aquí el enlace de la imagen"
          value={producto.imagen}
          onChange={manejarCambio}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <label className="flex items-center gap-3 text-gray-700 font-semibold">
        <input
          type="checkbox"
          name="disponible"
          checked={producto.disponible}
          onChange={manejarCambio}
          className="w-5 h-5"
        />
        Producto disponible
      </label>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition"
      >
        {productoEditar ? "Guardar cambios" : "Agregar producto"}
      </button>

      {productoEditar && (
        <button
          type="button"
          onClick={cancelarEdicion}
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition"
        >
          Cancelar edición
        </button>
      )}
    </form>
  );
}