import '../styles/About.css'

function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Sobre Tech Events</h1>
        <p className="subtitle">Sua plataforma para descobrir e compartilhar eventos de tecnologia</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Nossa Missão</h2>
          <p>
            A Tech Events nasceu com a missão de conectar profissionais de tecnologia e entusiastas em torno de eventos inovadores, palestras inspiradoras e oportunidades de aprendizado contínuo.
          </p>
        </div>

        <div className="about-section">
          <h2>O Que Oferecemos</h2>
          <ul>
            <li>Descobrir eventos de tecnologia próximos a você</li>
            <li>Conectar-se com profissionais da indústria</li>
            <li>Compartilhar e promover seus próprios eventos</li>
            <li>Acompanhar tendências e novidades do mercado</li>
            <li>Participar de comunidades temáticas</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Por Que Tech Events?</h2>
          <div className="features">
            <div className="feature">
              <h3>🎯 Focos e Metas Claros</h3>
              <p>Encontre eventos alinhados com seus interesses e objetivos profissionais</p>
            </div>
            <div className="feature">
              <h3>🌐 Comunidade Global</h3>
              <p>Conecte-se com pessoas de todo o mundo que compartilham sua paixão por tecnologia</p>
            </div>
            <div className="feature">
              <h3>📚 Aprendizado Contínuo</h3>
              <p>Acesse conteúdo exclusivo, palestras e workshops de especialistas</p>
            </div>
            <div className="feature">
              <h3>🤝 Networking</h3>
              <p>Expanda sua rede profissional e crie conexões significativas</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Contato</h2>
          <p>Tem dúvidas ou sugestões? Entre em contato conosco:</p>
          <div className="contact-info">
            <p><strong>E-mail:</strong> contato@techevents.com</p>
            <p><strong>Telefone:</strong> (11) 9999-9999</p>
            <p><strong>Redes Sociais:</strong> @techevents</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
