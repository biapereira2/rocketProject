import { useCarrinho } from '../context/carrinho';
import { useState } from 'react';
import './meuCarrinho.css';

type MeuCarrinhoProps = {
    aberto: boolean;
    onClose: () => void;
};

export function MeuCarrinho({ aberto, onClose }: MeuCarrinhoProps) {
    const { carrinho, adicionarProduto, removerProduto, limparCarrinho } = useCarrinho();
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
            <p>O carrinho está vazio.</p>
            ) : (
            carrinho.map(produto => (
            <div key={produto.id} className="item-carrinho">
                <h3>{produto.name}</h3>
                <p>R$ {produto.price.toFixed(2)}</p>
                <p>Quantidade: {produto.quantidade}</p>
                <p>Subtotal: R$ {(produto.price * produto.quantidade).toFixed(2)}</p>
                <img src={produto.image} alt={produto.name} />
                <div className="quantidade-controle">
                <button onClick={() => removerProduto(produto.id)}>-</button>
                <span>{produto.quantidade}</span>
                <button onClick={() => adicionarProduto(produto)}>+</button>
                </div>
                <span>{produto.price}</span>
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
