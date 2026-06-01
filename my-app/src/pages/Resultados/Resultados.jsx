import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Producto } from "../../components";
import DatosBD from "../../service/ApiDatos";

export function Resultados() {
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carritoBakeHub");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [metodoPago, setMetodoPago] = useState("Efectivo");

  useEffect(() => {
    localStorage.setItem("carritoBakeHub", JSON.stringify(carrito));
  }, [carrito]);

  const obtenerIdProducto = (producto) => {
    return producto.id || producto._id;
  };

  const limpiarNombreProducto = (nombre) => {
    return nombre.replace(/\s*x\d+$/i, "");
  };

  const total = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio * producto.cantidad;
  }, 0);

  const regresarMenu = () => {
    navigate("/");
  };

  const aumentarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map((producto) => {
      if (obtenerIdProducto(producto) === idProducto) {
        return {
          ...producto,
          cantidad: producto.cantidad + 1,
        };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  };

  const disminuirCantidad = (idProducto) => {
    const carritoActualizado = carrito
      .map((producto) => {
        if (obtenerIdProducto(producto) === idProducto) {
          return {
            ...producto,
            cantidad: producto.cantidad - 1,
          };
        }

        return producto;
      })
      .filter((producto) => producto.cantidad > 0);

    setCarrito(carritoActualizado);
  };

  const eliminarProducto = (idProducto) => {
    const carritoActualizado = carrito.filter(
      (producto) => obtenerIdProducto(producto) !== idProducto
    );

    setCarrito(carritoActualizado);
  };

  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No hay productos en el carrito.",
      });

      return;
    }

    try {
      const pedido = {
        productos: carrito.map((producto) => ({
          productoId: obtenerIdProducto(producto),
          nombre: limpiarNombreProducto(producto.nombre),
          precio: producto.precio,
          cantidad: producto.cantidad,
          subtotal: producto.precio * producto.cantidad,
        })),
        total,
        metodoPago,
        estado: "Pendiente",
      };

      const respuesta = await DatosBD.postPedido(pedido);

      if (respuesta.data.ok) {
        Swal.fire({
          icon: "success",
          title: "Pedido realizado",
          text: respuesta.data.message,
          timer: 1800,
          showConfirmButton: false,
        });

        setCarrito([]);
        localStorage.removeItem("carritoBakeHub");

        setTimeout(() => {
          navigate("/");
        }, 1800);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el pedido.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pink-700">
            Resumen del pedido
          </h1>

          <p className="text-gray-600">
            Revisa los productos agregados antes de confirmar.
          </p>
        </div>

        <button
          onClick={regresarMenu}
          className="bg-gray-200 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-300 transition"
        >
          Volver al menú
        </button>
      </section>

      {carrito.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Tu carrito está vacío
          </h2>

          <p className="text-gray-600 mb-5">
            Agrega productos desde el menú para poder realizar un pedido.
          </p>

          <button
            onClick={regresarMenu}
            className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
          >
            Ir al menú
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-4">
            {carrito.map((producto) => (
              <Producto
                key={obtenerIdProducto(producto)}
                item={producto}
                onAumentar={aumentarCantidad}
                onDisminuir={disminuirCantidad}
                onEliminar={eliminarProducto}
              />
            ))}
          </section>

          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Total del pedido
            </h2>

            <div className="space-y-3 mb-6">
              {carrito.map((producto) => {
                const nombreLimpio = limpiarNombreProducto(producto.nombre);

                return (
                  <div
                    key={obtenerIdProducto(producto)}
                    className="flex justify-between items-center text-gray-700 border-b pb-2 gap-4"
                  >
                    <div>
                      <p className="font-medium">{nombreLimpio}</p>
                      <p className="text-sm text-gray-500">
                        Cantidad: {producto.cantidad}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ${producto.precio * producto.cantidad}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Método de pago
              </label>

              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>

            {metodoPago === "Transferencia" && (
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-6">
                <p className="font-semibold text-pink-700">
                  Datos para transferencia
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  Cuenta: XXXX-XXXX-XXXX
                </p>

                <p className="text-gray-700 text-sm">Nombre: BakeHub</p>
              </div>
            )}

            <div className="flex justify-between items-center text-xl font-bold text-pink-700 mb-6">
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <button
              onClick={confirmarPedido}
              className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition"
            >
              Confirmar pedido
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}