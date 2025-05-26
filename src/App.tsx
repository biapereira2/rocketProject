import { Routes, Route } from 'react-router-dom';
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

  const [busca, setBusca] = useState('');7
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCarrinhoClick={() => setCarrinhoAberto(true)} onBuscar={setBusca} />

      <MeuCarrinho aberto={carrinhoAberto} onClose={() => setCarrinhoAberto(false)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Conjuntos filtro={busca} />} />
          <Route path="/historicoPedidos" element={<HistoricoPedidos />} />
          <Route path="/produto/:id" element={<Detalhes />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
