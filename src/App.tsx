import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Conjuntos } from './pages/conjuntos';
import { Navbar } from './components/navbar';
import { Detalhes } from './components/detalhes';
import { MeuCarrinho } from './components/meuCarrinho';
import { Footer } from './components/footer';
import './index.css';
import { useState } from 'react';
import { HistoricoPedidos } from './components/historicoPedidos';

function App() {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <>
      <Navbar onCarrinhoClick={() => setCarrinhoAberto(true)} />
      <MeuCarrinho aberto={carrinhoAberto} onClose={() => setCarrinhoAberto(false)} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conjuntos" element={<Conjuntos />} />
          <Route path="/historicoPedidos" element={<HistoricoPedidos />} />
          <Route path="/produto/:id" element={<Detalhes />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
