import './navbar.css';
import { ShoppingCart, Menu, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/carrinho';
import Logo from '/images/RocketShine.png';
import { useState } from 'react';

type NavbarProps = {
    onCarrinhoClick: () => void;
};

export function Navbar({ onCarrinhoClick }: NavbarProps) {
    const { carrinho } = useCarrinho();
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    const [menuAberto, setMenuAberto] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const navigate = useNavigate();

    function handlePesquisaChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPesquisa(e.target.value);
    }

    function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate(`/?busca=${encodeURIComponent(pesquisa)}`);
        setMenuAberto(false); // fecha o menu em telas pequenas
    }

    return (
        <>
        <nav className="navbar">
            <div className="navbar-logo">
            <Link to="/">
                <img src={Logo} alt="Logo" className="logo-img" />
            </Link>
            </div>

            <form onSubmit={handleSearchSubmit} className="navbar-center">
            <input
                type="text"
                placeholder="Buscar conjuntos"
                value={pesquisa}
                onChange={handlePesquisaChange}
                className="search-bar hidden md:block"
                aria-label="Barra de pesquisa"
            />
            </form>

            <div className="navbar-right">
            <Link to="/historicoPedidos" className="navbar-link hidden md:inline">
                Meus pedidos
            </Link>

            <Link to="/favoritos" className="navbar-button" aria-label="Favoritos">
                <Heart size={25} />
            </Link>

            <button className="navbar-button" onClick={onCarrinhoClick} aria-label="Carrinho">
                <ShoppingCart size={25} />
                {totalItens > 0 && (
                <div className="cart-badge">{totalItens}</div>
                )}
            </button>

            <button
                className="md:hidden text-white"
                onClick={() => setMenuAberto(!menuAberto)}
                aria-label="Abrir menu"
            >
                <Menu size={25} />
            </button>
            </div>
        </nav>

        {menuAberto && (
            <div className="mobile-menu md:hidden w-full bg-[#a7987e] px-6 py-4 space-y-4 text-white">
            <form onSubmit={handleSearchSubmit}>
                <input
                type="text"
                placeholder="Buscar..."
                value={pesquisa}
                onChange={handlePesquisaChange}
                className="search-bar-mobile w-full px-4 py-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a7987e]"
                aria-label="Barra de pesquisa mobile"
                />
            </form>

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
