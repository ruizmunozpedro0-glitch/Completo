import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FormProducto } from "../../components";
import DatosBD from "../../service/ApiDatos";

export function Gestion() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [productoEditar, setProductoEditar] = useState(null);

  const formularioRef = useRef(null);

  const obtenerIdProducto = (producto) => {
    return producto.id || producto._id;
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await DatosBD.getProductos();

      if (respuesta.data.ok) {
        setProductos(respuesta.data.productos);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los productos.",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await DatosBD.postProducto(nuevoProducto);

      if (respuesta.data.ok) {
        setProductos([respuesta.data.producto, ...productos]);

        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: respuesta.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el producto en la base de datos.",
      });
    }
  };

  const seleccionarProductoEditar = (producto) => {
    setProductoEditar(producto);

    Swal.fire({
      icon: "info",
      title: "Modo edición",
      text: `Ahora puedes editar: ${producto.nombre}`,
      timer: 1200,
      showConfirmButton: false,
    });

    setTimeout(() => {
      formularioRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const editarProducto = async (productoActualizado) => {
    if (!productoEditar) {
      Swal.fire({
        icon: "warning",
        title: "Sin producto seleccionado",
        text: "Primero selecciona un producto para editar.",
      });
      return;
    }

    try {
      const idProducto = obtenerIdProducto(productoEditar);

      const respuesta = await DatosBD.updateProducto(
        idProducto,
        productoActualizado
      );

      if (respuesta.data.ok) {
        const productosActualizados = productos.map((producto) =>
          obtenerIdProducto(producto) === idProducto
            ? respuesta.data.producto
            : producto
        );

        setProductos(productosActualizados);
        setProductoEditar(null);

        Swal.fire({
          icon: "success",
          title: "Producto editado",
          text: respuesta.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo editar el producto.",
      });
    }
  };

  const cancelarEdicion = () => {
    setProductoEditar(null);

    Swal.fire({
      icon: "info",
      title: "Edición cancelada",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const eliminarProducto = async (idProducto) => {
    try {
      const respuesta = await DatosBD.deleteProducto(idProducto);

      if (respuesta.data.ok) {
        const productosActualizados = productos.filter(
          (producto) => obtenerIdProducto(producto) !== idProducto
        );

        setProductos(productosActualizados);

        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          text: respuesta.data.message,
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el producto.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white shadow-md rounded-2xl p-5">
        <h1 className="text-3xl font-bold text-pink-700">
          Gestión de productos
        </h1>

        <p className="text-gray-600">
          Administra los productos que aparecerán en el menú digital.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section ref={formularioRef}>
          <FormProducto
            onAgregarProducto={agregarProducto}
            onEditarProducto={editarProducto}
            productoEditar={productoEditar}
            cancelarEdicion={cancelarEdicion}
          />
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Lista de productos
          </h2>

          {cargando ? (
            <p className="text-gray-500">Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p className="text-gray-500">
              Aún no has agregado productos.
            </p>
          ) : (
            <div className="space-y-4">
              {productos.map((producto) => (
                <article
                  key={obtenerIdProducto(producto)}
                  className="border rounded-2xl p-4 flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={
                      producto.imagen ||
                      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
                    }
                    alt={producto.nombre}
                    className="w-full sm:w-28 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {producto.nombre}
                      </h3>

                      <span className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                        {producto.categoria}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mt-2">
                      {producto.descripcion}
                    </p>

                    <p className="text-pink-700 font-bold mt-2">
                      ${producto.precio}
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        producto.disponible
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {producto.disponible
                        ? "Disponible"
                        : "No disponible"}
                    </p>

                    <div className="flex gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => seleccionarProductoEditar(producto)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          eliminarProducto(obtenerIdProducto(producto))
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}