import { useParams } from "react-router-dom";
import catalogo from "../data/catalogo.json";
import './detalhes.css';
import { useCarrinho } from "../context/carrinho.tsx";

export function Detalhes() {
    const { id } = useParams();
    const produto = catalogo.find((item) => item.id === parseInt(id ?? ''));
    const { adicionarProduto, removerProduto, quantidadeProduto } = useCarrinho();

    const quantidade = produto ? quantidadeProduto(produto.id) : 0;

    if (!produto) {
        return <p>Produto não encontrado.</p>;
    }

    return (
        <div className="detalhes-container">
            <div className="detalhes-conteudo">
                <img src={produto.image} alt={produto.name} className="detalhes-imagem" />
                <div className="detalhes-info">
                    <h1>{produto.name}</h1>
                    <p>{produto.description}</p>
                    <span className="detalhes-preco">{produto.price}</span>

                    <div className="botao">
                        {quantidade === 0 ? (
                        <button className="adicionar-carrinho" onClick={() => adicionarProduto(produto)}>
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
        </div>
    </div>
    );
}
