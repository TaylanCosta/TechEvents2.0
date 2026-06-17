import './Hero.css'

const codeLines = [
  { indent: 0, parts: [{ type: 'keyword', text: 'import' }, { type: 'string', text: "'tech-community'" }] },
  { indent: 0, parts: [{ type: 'keyword', text: 'const' }, { type: 'func', text: 'connect' }, { type: 'paren', text: '() =>' }, { type: 'plain', text: ' {' }] },
  { indent: 1, parts: [{ type: 'keyword', text: 'return' }, { type: 'paren', text: '(' }] },
  { indent: 2, parts: [{ type: 'tag', text: '<Event' }, { type: 'prop', text: 'name=' }, { type: 'string', text: '"React Summit 2026"' }, { type: 'plain', text: ' />' }] },
  { indent: 1, parts: [{ type: 'paren', text: ')' }] },
  { indent: 0, parts: [{ type: 'plain', text: '}' }] },
  { indent: 0, parts: [{ type: 'keyword', text: 'export' }, { type: 'keyword', text: 'default' }, { type: 'func', text: 'connect' }] },
]

function CodeLine({ indent, parts }: { indent: number; parts: { type: string; text: string }[] }) {
  return (
    <div className={`code-line${indent > 0 ? ` indent-${indent}` : ''}`}>
      {parts.map((p, i) => (
        <span key={i} className={`code-${p.type}`}>{p.text}</span>
      ))}
    </div>
  )
}

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <span className="hero-badge">Eventos de Tecnologia</span>
          <h1>Descubra os Melhores<br />Eventos de Tecnologia</h1>
          <p>Encontre, participe e conecte-se com a comunidade tech mais vibrante do Brasil</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Explorar Eventos</button>
            <button className="btn btn-secondary">Saiba Mais</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-code-snippet">
            {codeLines.map((line, i) => (
              <CodeLine key={i} indent={line.indent} parts={line.parts} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero