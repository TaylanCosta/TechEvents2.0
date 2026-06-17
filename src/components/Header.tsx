import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const toggle = () => setOpen(o => !o)
  const close = () => setOpen(false)

  const handleLogout = async () => {
    await logout()
    close()
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={close}>
            <h1>TechEvents</h1>
          </Link>

          <nav className="nav" aria-label="Main navigation">
            <Link to="/" onClick={close}>Início</Link>
            <Link to="/events" onClick={close}>Eventos</Link>
            <Link to="/about" onClick={close}>Sobre</Link>
            {isAuthenticated && (
              <Link to="/create-event" className="nav-create" onClick={close}>Criar Evento</Link>
            )}
          </nav>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="btn btn-primary">
                  {user?.name?.split(' ')[0] || 'Perfil'}
                </Link>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Entrar</Link>
                <Link to="/register" className="btn btn-primary">Cadastrar</Link>
              </>
            )}
          </div>

          <button
            className="mobile-toggle"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={toggle}
          >
            <span className={`hamburger ${open ? 'open' : ''}`} aria-hidden="true"></span>
          </button>
        </div>

        <div id="mobile-menu" className={`mobile-nav ${open ? 'open' : ''}`} aria-hidden={!open}>
          <nav className="mobile-links">
            <Link to="/" onClick={close}>Início</Link>
            <Link to="/events" onClick={close}>Eventos</Link>
            <Link to="/about" onClick={close}>Sobre</Link>
            {isAuthenticated && (
              <Link to="/create-event" onClick={close}>Criar Evento</Link>
            )}
          </nav>
          <div className="mobile-auth">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="btn btn-primary" onClick={close}>
                  {user?.name?.split(' ')[0]}
                </Link>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={close}>Entrar</Link>
                <Link to="/register" className="btn btn-primary" onClick={close}>Cadastrar</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header