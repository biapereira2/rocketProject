import catalogo from "../data/catalogo.json";
import { useFavoritos } from "../context/favoritos";
import {Heart} from "lucide-react"
import "./favoritos.css";

export function Favoritos() {
    const { favoritos } = useFavoritos();

    const produtosFavoritos = catalogo.filter(produto => favoritos.includes(produto.id));

    if (produtosFavoritos.length === 0) {
        return (
            <div className="sem-favoritos">
                <Heart className="sem-favoritos-coracao" />
                <p>Você não tem produtos favoritos ainda.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="catalogo">
                {produtosFavoritos.map(produto => (
                    <div key={produto.id} className="catalogo-item">
                        <img src={produto.image} alt={produto.name} />
                        <h3>{produto.name}</h3>
                        <p>R$ {produto.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
