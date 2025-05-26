import './navbar.css';
import { ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/carrinho';
import Logo from '/images/RocketShine.png';
import { useState } from 'react';

type NavbarProps = {
    onCarrinhoClick: () => void;
    onBuscar: (texto: string) => void;
};

export function Navbar({ onCarrinhoClick, onBuscar }: NavbarProps) {
    const { carrinho } = useCarrinho();
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    const [menuAberto, setMenuAberto] = useState(false);
    const [pesquisa, setPesquisa] = useState('');

    function handlePesquisaChange(e: React.ChangeEvent<HTMLInputElement>) {
        const valor = e.target.value;
        setPesquisa(valor);
        onBuscar(valor);
    }

    return (
        <>
            <nav className="navbar">
                {/* Esquerda - logo */}
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo-img" />
                    </Link>
                </div>

                {/* Centro - barra de busca (aparece só em desktop) */}
                <div className="navbar-center">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={pesquisa}
                        onChange={handlePesquisaChange}
                        className="search-bar hidden md:block"
                        aria-label="Barra de pesquisa"
                    />
                </div>

                {/* Direita - Meus pedidos (desktop), carrinho e menu mobile */}
                <div className="navbar-right">
                    {/* Meus pedidos só aparece em desktop */}
                    <Link to="/historicoPedidos" className="navbar-link hidden md:inline">
                        Meus pedidos
                    </Link>

                    {/* Botão carrinho sempre visível */}
                    <button className="navbar-button" onClick={onCarrinhoClick} aria-label="Carrinho">
                        <ShoppingCart size={25} />
                        {totalItens > 0 && (
                            <div className="cart-badge">{totalItens}</div>
                        )}
                    </button>

                    {/* Botão menu hamburguer só aparece no mobile */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuAberto(!menuAberto)}
                        aria-label="Abrir menu"
                    >
                        <Menu size={25} />
                    </button>
                </div>
            </nav>

            {/* Menu mobile: inclui barra de busca e link "Meus pedidos" */}
            {menuAberto && (
                <div className="mobile-menu md:hidden w-full bg-[#a7987e] px-6 py-4 space-y-4 text-white">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={pesquisa}
                        onChange={handlePesquisaChange}
                        className="search-bar-mobile w-full px-4 py-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a7987e]"
                        aria-label="Barra de pesquisa mobile"
                    />
                    <Link
                        to="/historicoPedidos"
                        className="block navbar-link"
                        onClick={() => setMenuAberto(false)}
                    >
                        Meus pedidos
                    </Link>
                </div>
            )}
        </>
    );
}
