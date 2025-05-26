import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CarrinhoProvider } from './context/carrinho.tsx'
import { FavoritosProvider } from './context/favoritos.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritosProvider>
      <CarrinhoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CarrinhoProvider>
    </FavoritosProvider>
  </React.StrictMode>
);

