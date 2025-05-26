import './footer.css';
import logo from '/images/RocketShine.png';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container flex justify-between items-start">
                <div className="footer-section max-w-lg">
                    <h3 className="footer-title">Sobre nós</h3>
                    <p className="footer-text">
                        Há 20 anos no mercado, a Rocket Shine é referência em joias douradas versáteis, cuidadosamente selecionadas para combinar com seu estilo único. 
                        Nossas peças são pensadas para acompanhar você em todos os momentos, trazendo elegância e sofisticação de forma prática e acessível.
                    </p>
                </div>

                <div className="footer-section flex items-center">
                    <img src={logo} alt="Logo" className="h-20 object-contain" />
                </div>
            </div>

            <div className="footer-copy">
                © {new Date().getFullYear()} RocketShine. Todos os direitos reservados.
            </div>
        </footer>
    );
}
