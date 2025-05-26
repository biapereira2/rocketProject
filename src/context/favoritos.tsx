import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type FavoritosContextType = {
    favoritos: number[];
    adicionarFavorito: (id: number) => void;
    removerFavorito: (id: number) => void;
    estaFavorito: (id: number) => boolean;
};

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export function FavoritosProvider({ children }: { children: ReactNode }) {
    const [favoritos, setFavoritos] = useState<number[]>(() => {
    const favoritosSalvos = localStorage.getItem('favoritos');
    return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
});

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    function adicionarFavorito(id: number) {
        setFavoritos((old) => (old.includes(id) ? old : [...old, id]));
    }

    function removerFavorito(id: number) {
        setFavoritos((old) => old.filter((favId) => favId !== id));
    }

    function estaFavorito(id: number) {
        return favoritos.includes(id);
    }

    return (
        <FavoritosContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito, estaFavorito }}>
        {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    const context = useContext(FavoritosContext);
    if (!context) {
        throw new Error('useFavoritos must be used within a FavoritosProvider');
    }
    return context;
}