import catalogo from "../data/catalogo.json";
import './conjuntos.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from "../context/carrinho.tsx";

export function Conjuntos() {
    const { adicionarProduto } = useCarrinho();
    const navigate = useNavigate();

    return (
        <div>
            <div className="catalogo">
                {catalogo.map(produto => (
                    <div 
                        key={produto.id} 
                        className="catalogo-item"
                        onClick={() => navigate(`/produto/${produto.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={produto.image} alt={produto.name} />
                        <h2>{produto.name}</h2>
                        <span>R$ {produto.price}</span>
                        
                        <div className="botoes-catalogo">
                            <button
                                className="adicionar-carrinho-catalogo"
                                onClick={(e) => {
                                    e.stopPropagation(); // evita navegação ao clicar
                                    adicionarProduto(produto);
                                }}
                            >
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
