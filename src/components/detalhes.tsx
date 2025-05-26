import { useParams } from 'react-router-dom';
import catalogo from '../data/catalogo.json';
import './detalhes.css';
import { useCarrinho } from '../context/carrinho';
import { Heart } from 'lucide-react';
import { useFavoritos } from '../context/favoritos';

export function Detalhes() {
    const { id } = useParams();
    const produto = catalogo.find((item) => item.id === parseInt(id ?? ''));
    const { adicionarProduto, removerProduto, quantidadeProduto } = useCarrinho();
    const { estaFavorito, adicionarFavorito, removerFavorito } = useFavoritos();

    const quantidade = produto ? quantidadeProduto(produto.id) : 0;
    const favorito = produto ? estaFavorito(produto.id) : false;

    if (!produto) {
        return <p>Produto não encontrado.</p>;
    }

    function toggleFavorito() {
        if (!produto) return;

        if (favorito) {
        removerFavorito(produto.id);
        console.log('REMOVIDO dos favoritos', produto.id);
        } else {
        adicionarFavorito(produto.id);
        console.log('ADICIONADO aos favoritos', produto.id);
        }
    }

    return (
        <div className="detalhes-container">
        <div className="detalhes-conteudo">
            <img src={produto.image} alt={produto.name} className="detalhes-imagem" />
            <div className="detalhes-info">
            <h1>{produto.name}</h1>
            <p>{produto.description}</p>
            <span className="detalhes-preco">R$ {produto.price}</span>

            <div className="botoes-acoes" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
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

            <button onClick={toggleFavorito} aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: favorito ? 'red' : 'gray',
                    fontSize: '1.8rem',
                    padding: 0,
                }}>
                <Heart />
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}
