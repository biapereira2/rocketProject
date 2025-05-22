import catalogo from "../data/catalogo.json";
import './conjuntos.css'
import { Link } from 'react-router-dom';

export function Conjuntos(){
    return(
        <div>
            <div className="catalogo">
                {catalogo.map(produto => (
                    <div key={produto.id} className="catalogo-item">
                        <img src={produto.image} alt={produto.name} />
                        <h2>{produto.name}</h2>
                        <span>R$ {produto.price}</span>
                        <Link to={`/produto/${produto.id}`} className="saiba-mais">Saiba mais</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

