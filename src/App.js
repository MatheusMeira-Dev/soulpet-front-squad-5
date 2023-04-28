import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { Pets } from "./pages/Pets/Pets";
import { PetsInfo } from "./pages/PetsInfo/PetsInfo";

import { Produtos } from "./pages/Produtos/Produtos"; 
import { EditaPet } from "./pages/EditaPet/EditaPet";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/pet/editar/:id" element={<EditaPet />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/petsinfo/:id" element={<PetsInfo />} />
          <Route path="/produtos" element={<Produtos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
