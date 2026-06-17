import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { eventService } from '../services/eventService'
import { useAuth } from '../contexts/AuthContext'
import type { Event } from '../data/events'
import '../styles/EventDetails.css'

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, toggleSavedEvent } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [registering, setRegistering] = useState(false)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError('')
      try {
        const result = await eventService.fetchEventById(Number(id))
        setEvent(result)
        if (!result) setError('Evento não encontrado')
      } catch {
        setError('Erro ao carregar evento')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  const [feedback, setFeedback] = useState('')

  const handleRegister = () => {
    if (!user) {
      navigate('/login')
      return
    }
    setRegistering(true)
    // Simula inscrição
    setTimeout(() => {
      setFeedback(`✅ Inscrição confirmada em: ${event?.title}`)
      setRegistering(false)
    }, 800)
  }

  const handleSave = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    if (event) {
      await toggleSavedEvent(event.id)
    }
  }

  if (isLoading) {
    return (
      <div className="event-details-container">
        <div className="event-loading">
          <div className="skeleton-image-full" />
          <div className="skeleton-body">
            <div className="skeleton-line short" />
            <div className="skeleton-line long" />
            <div className="skeleton-line medium" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="event-details-container">
        <div className="event-not-found">
          <h1>Evento não encontrado</h1>
          <p>{error || 'Desculpe, não conseguimos encontrar o evento que você procura.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Voltar para Home
          </button>
        </div>
      </div>
    )
  }

  const isEventSaved = user?.savedEvents?.includes(event.id)

  return (
    <div className="event-details-container">
      <div className="event-header">
        <img src={event.image} alt={event.title} className="event-image" />
        <div className="event-overlay">
          <h1>{event.title}</h1>
          <div className="event-rating">
            <span className="stars">★★★★☆</span>
            <span className="rating-value">{event.rating}/5.0</span>
          </div>
        </div>
      </div>

      {feedback && (
        <div className="feedback-banner">{feedback}</div>
      )}

      <div className="event-content">
        <div className="event-main">
          <div className="event-info-grid">
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div>
                <p className="info-label">Data</p>
                <p className="info-value">{event.date}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <p className="info-label">Horário</p>
                <p className="info-value">{event.time}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <p className="info-label">Local</p>
                <p className="info-value">{event.location}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">👥</span>
              <div>
                <p className="info-label">Participantes</p>
                <p className="info-value">{event.attendees} de {event.capacity}</p>
              </div>
            </div>
          </div>

          <section className="event-section">
            <h2>Sobre o Evento</h2>
            <p className="event-description">{event.description}</p>
          </section>

          <section className="event-section">
            <h2>Organizador</h2>
            <div className="organizer-card">
              <img src={event.organizerImage} alt={event.organizer} className="organizer-image" />
              <div className="organizer-info">
                <h3>{event.organizer}</h3>
                <button className="follow-btn" onClick={() => setFeedback('👤 Seguindo organizador!')}>
                  Seguir
                </button>
              </div>
            </div>
          </section>

          <section className="event-section">
            <div className="section-header-row">
              <h2>Comentários (12)</h2>
              <Link to="/events" className="back-link">← Voltar para eventos</Link>
            </div>
            <div className="comments">
              <div className="comment">
                <div className="comment-author">João Silva</div>
                <div className="comment-text">Ótimo evento! Aprendi muito sobre React hooks.</div>
                <div className="comment-date">2 dias atrás</div>
              </div>
              <div className="comment">
                <div className="comment-author">Maria Santos</div>
                <div className="comment-text">Palestras incríveis, voltaria com certeza!</div>
                <div className="comment-date">1 semana atrás</div>
              </div>
            </div>
          </section>
        </div>

        <aside className="event-sidebar">
          <div className="event-card">
            <div className="price-section">
              <p className="price-label">Ingresso</p>
              <p className="price-value">R$ {event.price.toFixed(2)}</p>
            </div>

            <div className="capacity-section">
              <p className="capacity-label">Lugares disponíveis</p>
              <div className="capacity-bar">
                <div className="capacity-fill" style={{width: `${(event.attendees/event.capacity)*100}%`}}></div>
              </div>
              <p className="capacity-text">{event.capacity - event.attendees} vagas restantes</p>
            </div>

            <button
              className="register-btn"
              onClick={handleRegister}
              disabled={registering}
            >
              {registering ? 'Confirmando...' : user ? 'Inscrever-se Agora' : 'Faça login para se inscrever'}
            </button>

            {user && (
              <button
                className={`save-btn ${isEventSaved ? 'saved' : ''}`}
                onClick={handleSave}
              >
                {isEventSaved ? '♥ Salvo' : '♡ Salvar Evento'}
              </button>
            )}

            <div className="share-section">
              <p className="share-label">Compartilhar</p>
              <div className="share-buttons">
                <button className="share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>f</button>
                <button className="share-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}`)}>𝕏</button>
                <button className="share-btn">📌</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default EventDetails