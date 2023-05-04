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
import { Servicos } from "./pages/Servicos/Servicos";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { EditarProdutos } from "./pages/EditarProduto/EditarProdutos";
import { EditarServico } from "./pages/EditarServico/EditarServico";
import { NovoServico } from "./pages/NovoServico/NovoServico";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicos" element={<Servicos/>} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/servicos/editar/:id" element={<EditarServico />} />
          <Route path="/pet/editar/:id" element={<EditaPet />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/petsinfo/:id" element={<PetsInfo />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/novo" element={<NovoProduto />} />
          <Route path="/produto/editar/:id" element={< EditarProdutos />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
