import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Produto = {
    id: number;
    name: string;
    price: number;
    description?: string;
    quantidade: number;
    image: string;
};

type CarrinhoContextType = {
    carrinho: Produto[];
    adicionarProduto: (produto: Omit<Produto, 'quantidade'>) => void;
    removerProduto: (produtoId: number) => void;
    quantidadeProduto: (produtoId: number) => number;
    limparCarrinho: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

type CarrinhoProviderProps = {
    children: ReactNode;
};

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
    const [carrinho, setCarrinho] = useState<Produto[]>(() => {
        const local = localStorage.getItem('carrinho');
        return local ? JSON.parse(local) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    const adicionarProduto = (produto: Omit<Produto, 'quantidade'>) => {
        setCarrinho((prev) => {
            const existe = prev.find((item) => item.id === produto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            }
            return [...prev, { ...produto, quantidade: 1 }];
        });
    };

    const removerProduto = (produtoId: number) => {
        setCarrinho((prev) =>
            prev
                .map((item) =>
                    item.id === produtoId
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    };

    const quantidadeProduto = (produtoId: number) => {
        return carrinho.find((item) => item.id === produtoId)?.quantidade ?? 0;
    };

    function limparCarrinho() {
        setCarrinho([]); 
        localStorage.removeItem('carrinho');
    }

    return (
        <CarrinhoContext.Provider
            value={{ carrinho, adicionarProduto, removerProduto, quantidadeProduto, limparCarrinho }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinho must be used within a CarrinhoProvider');
    }
    return context;
}
