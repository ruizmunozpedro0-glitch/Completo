import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Gestion, Resultados } from "../pages";
import { AdminLayouts } from "../layouts";

function Rutas() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(AdminLayouts, Home)} />
      <Route path="/home" element={loadLayout(AdminLayouts, Home)} />
      <Route path="/gestion" element={loadLayout(AdminLayouts, Gestion)} />
      <Route path="/resultados" element={loadLayout(AdminLayouts, Resultados)} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Rutas;