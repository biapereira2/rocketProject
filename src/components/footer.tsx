import './footer.css';

export function Footer() {
    return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-section">
                <h3 className="footer-title">Sobre</h3>
                <p className="footer-text">
                    Loja fictícia criada para estudos com React, TypeScript e TailwindCSS.
                </p>
            </div>

            <div className="footer-section">
                <h3 className="footer-title">Links</h3>
                <ul className="footer-links">
                    <li><a href="#">Início</a></li>
                    <li><a href="#">Catálogo</a></li>
                    <li><a href="#">Carrinho</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h3 className="footer-title">Siga a gente</h3>
                <div className="footer-social">
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
        </div>

        <div className="footer-copy">
            © {new Date().getFullYear()} Meu E-commerce. Todos os direitos reservados.
        </div>
    </footer>
    );
}
