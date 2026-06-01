const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productoRouter = require("./router/productoRouter");
const pedidoRouter = require("./router/pedidoRouter");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Base de datos conectada correctamente a MongoDB Atlas");
  })
  .catch((error) => {
    console.log("Error al conectar con MongoDB:");
    console.log(error.message);
  });

app.use("/api/producto", productoRouter);
app.use("/api/pedido", pedidoRouter);

app.get("/", (req, res) => {
  res.send("Servidor de BakeHub funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});