import api from "../Api/connectioAxios";

class DatosBD {
  async getProductos() {
    return await api.get("/producto/buscar");
  }

  async postProducto(data) {
    return await api.post("/producto/create", data);
  }

  async deleteProducto(id) {
    return await api.delete(`/producto/eliminar/${id}`);
  }

  async updateProducto(id, data) {
  return await api.put(`/producto/editar/${id}`, data);
}

  async postPedido(data) {
    return await api.post("/pedido/create", data);
  }

  async getPedidos() {
    return await api.get("/pedido/buscar");
  }
}

export default new DatosBD();