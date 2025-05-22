import { useEffect, useState } from 'react';
import './historicoPedidos.css';

type Pedido = {
    id: string;
    data: string;
    total: number;
    itens: {
        id: string;
        name: string;
        price: number;
        quantidade: number;
        image: string;
    }[];
};

export function HistoricoPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        const dados = localStorage.getItem('historicoPedidos');
        if (dados) {
        setPedidos(JSON.parse(dados));
        }
    }, []);

    return (
        <div className="historico-container">
        <h2 className="historico-titulo">Histórico de Pedidos</h2>

        {pedidos.length === 0 ? (
            <p className="historico-vazio">Você ainda não fez nenhum pedido.</p>
        ) : (
            pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
                <div className="pedido-info">
                <p><strong>Pedido:</strong> #{pedido.id}</p>
                <p><strong>Data:</strong> {pedido.data}</p>
                <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
                </div>

                <div className="pedido-itens">
                {pedido.itens.map((item) => (
                    <div key={item.id} className="item-historico">
                    <img src={item.image} alt={item.name} />
                    <div>
                        <h4>{item.name}</h4>
                        <p>Qtd: {item.quantidade}</p>
                        <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            ))
        )}
        </div>
    );
}
