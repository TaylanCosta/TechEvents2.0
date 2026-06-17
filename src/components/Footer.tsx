import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>TechEvents</h4>
            <p>Conectando a comunidade tech através de eventos incríveis.</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Eventos</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Receba as novidades sobre eventos tech</p>
            <input type="email" placeholder="seu@email.com" />
            <button className="btn btn-primary">Inscrever</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 TechEvents. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
