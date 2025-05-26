import { useCarrinho } from '../context/carrinho';
import { useState } from 'react';
import './meuCarrinho.css';

type MeuCarrinhoProps = {
    aberto: boolean;
    onClose: () => void;
    };

    export function MeuCarrinho({  aberto,  onClose }: MeuCarrinhoProps) {
    const {  carrinho,  adicionarProduto,  removerProduto,  limparCarrinho } = useCarrinho();
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const total = carrinho.reduce((acc, item) => acc + item.price * item.quantidade, 0);

    function finalizarCompra() {
        if (carrinho.length === 0) return;

        const novoPedido = {
        id: Date.now().toString(),
        data: new Date().toLocaleDateString(),
        total: carrinho.reduce((acc, item) => acc + item.price * item.quantidade, 0),
        itens: [...carrinho],
        };

        const historicoExistente = JSON.parse(localStorage.getItem('historicoPedidos') || '[]');

        const novoHistorico = [novoPedido, ...historicoExistente];
        localStorage.setItem('historicoPedidos', JSON.stringify(novoHistorico));

        limparCarrinho();

        setMensagemSucesso('Compra finalizada com sucesso!');

        setTimeout(() => {
        setMensagemSucesso('');
        onClose();
        }, 3000);
    }

    return (
        <>
        <div className={`meu-carrinho ${aberto ? 'aberto' : ''}`}>
            <button className="fechar" onClick={onClose}>×</button>
            {mensagemSucesso && (
            <div className="mensagem-sucesso">
                {mensagemSucesso}
            </div>
            )}
            {carrinho.length === 0 ? (
                <div className="carrinho-vazio">
                    <p>O carrinho está vazio.</p>
                    <p>Adicione produtos para começar!</p>
                </div>
            ) : (
                carrinho.map(produto => (
                    <div key={produto.id} className="item-carrinho">
                        <div className="topo-item flex gap-4">
                            <img src={produto.image} alt={produto.name} className="img-produto" />
                            <div className="item-info">
                                <h3>{produto.name}</h3>
                                <p>R$ {produto.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="quantidade-subtotal">
                            <div className="quantidade-controle">
                                <button onClick={() => removerProduto(produto.id)}>-</button>
                                <span>{produto.quantidade}</span>
                                <button onClick={() => adicionarProduto(produto)}>+</button>
                            </div>
                            <span className="subtotal">
                                Subtotal: R$ {(produto.price * produto.quantidade).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))
            )}

            {carrinho.length > 0 && (
            <>
                <div className="total-carrinho">
                <strong>Total: R$ {total.toFixed(2)}</strong>
                </div>

                <button
                className="finalizar-compra"
                onClick={finalizarCompra}
                disabled={carrinho.length === 0}
                >
                Finalizar Compra
                </button>
            </>
            )}
        </div>
        </>
    );
}
