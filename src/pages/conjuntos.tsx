import catalogo from "../data/catalogo.json";
import './conjuntos.css';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from "../context/carrinho.tsx";

export function Conjuntos() {
    const { adicionarProduto, removerProduto, quantidadeProduto } = useCarrinho();
    const navigate = useNavigate();

    return (
        <div>
            <div className="catalogo">
                {catalogo.map(produto => {
                    const quantidade = quantidadeProduto(produto.id);

                    return (
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
                                {quantidade === 0 ? (
                                    <button
                                        className="adicionar-carrinho-catalogo"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            adicionarProduto(produto);
                                        }}
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                ) : (
                                    <div className="mais-menos" onClick={(e) => e.stopPropagation()}>
                                        <button className="btn" onClick={() => removerProduto(produto.id)}>-</button>
                                        <span className="quantidade">{quantidade}</span>
                                        <button className="btn" onClick={() => adicionarProduto(produto)}>+</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
