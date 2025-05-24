import './navbar.css';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/carrinho';

type NavbarProps = {
    onCarrinhoClick: () => void;
};

export function Navbar({ onCarrinhoClick }: NavbarProps) {
    const { carrinho } = useCarrinho();
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    return (
        <nav className="navbar">
            <div className="navbar-logo">Logo</div>

            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/conjuntos" className="navbar-link">Conjuntos</Link>
                <Link to="/historicoPedidos" className="navbar-link">Meus pedidos</Link>
            </div>

            <div className="navbar-icons">
                <button className="navbar-button" onClick={onCarrinhoClick} aria-label="Carrinho">
                    <ShoppingCart size={25} />
                    {totalItens > 0 && (
                        <div className="cart-badge">{totalItens}</div>
                    )}
                </button>
            </div>
        </nav>
    );
}
