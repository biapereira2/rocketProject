import catalogo from "../data/catalogo.json";
import './conjuntos.css';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from "../context/carrinho.tsx";

type ConjuntosProps = {
    filtro: string;
};

export function Conjuntos({ filtro = ""}: ConjuntosProps) {
    const { adicionarProduto, removerProduto, quantidadeProduto } = useCarrinho();
    const navigate = useNavigate();

    const produtosFiltrados = catalogo.filter(produto => 
        produto.name.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.description.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
        <div className="catalogo">
            {produtosFiltrados.length === 0 ? (

            <p>Nenhum produto encontrado para "{filtro}"</p>
            
            ) : (
            produtosFiltrados.map(produto => {
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

                    <div className="botoes-catalogo" onClick={e => e.stopPropagation()}>
                        {quantidade === 0 ? (
                            <button className="adicionar-carrinho-catalogo" onClick={() => adicionarProduto(produto)}>
                                Adicionar ao carrinho
                            </button>
                        ) : (
                        <div className="mais-menos">
                            <button className="btn" onClick={() => removerProduto(produto.id)}>-</button>
                            <span className="quantidade">{quantidade}</span>
                            <button className="btn" onClick={() => adicionarProduto(produto)}>+</button>
                        </div>
                    )}
                    </div>
                </div>
            );  
            })
        )}
        </div>
    </div>
    );
}
