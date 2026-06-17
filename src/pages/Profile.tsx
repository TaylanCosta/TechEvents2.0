import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { eventService } from '../services/eventService'
import type { Event } from '../data/events'
import '../styles/Profile.css'

function Profile() {
  const navigate = useNavigate()
  const { user, isLoading: authLoading, isAuthenticated, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [savedEvents, setSavedEvents] = useState<Event[]>([])
  const [createdEvents, setCreatedEvents] = useState<Event[]>([])
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [loadingCreated, setLoadingCreated] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: ''
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || ''
      })

      // Carrega eventos salvos
      if (user.savedEvents.length > 0) {
        setLoadingEvents(true)
        Promise.all(
          user.savedEvents.map(id => eventService.fetchEventById(id))
        ).then(events => {
          setSavedEvents(events.filter((e): e is Event => e !== null))
        }).finally(() => setLoadingEvents(false))
      } else {
        setSavedEvents([])
      }

      // Carrega eventos criados
      if (user.createdEvents.length > 0) {
        setLoadingCreated(true)
        Promise.all(
          user.createdEvents.map(id => eventService.fetchEventById(id))
        ).then(events => {
          setCreatedEvents(events.filter((e): e is Event => e !== null))
        }).finally(() => setLoadingCreated(false))
      } else {
        setCreatedEvents([])
      }
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location,
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || ''
      })
    }
    setIsEditing(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="skeleton-avatar" />
          <div className="skeleton-line short" />
          <div className="skeleton-line medium" />
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar-wrapper">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=150`}
              alt={user.name}
              className="profile-avatar"
            />
          </div>
          <div className="profile-details">
            <h1>{user.name}</h1>
            {user.location && <p className="profile-location">📍 {user.location}</p>}
            <p className="profile-join">Membro desde {user.joinDate}</p>
          </div>
          <div className="profile-actions">
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {isEditing ? (
          <div className="profile-edit">
            <h2>Editar Perfil</h2>
            <form className="edit-form">
              <div className="form-group">
                <label>Nome Completo</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Localização</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
              </div>
              <div className="form-actions">
                <button type="button" className="save-btn" onClick={handleSave}>Salvar Alterações</button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="profile-stats">
              <div className="stat">
                <p className="stat-value">{user.registeredEvents?.length || 0}</p>
                <p className="stat-label">Eventos Participados</p>
              </div>
              <div className="stat">
                <p className="stat-value">{user.savedEvents?.length || 0}</p>
                <p className="stat-label">Eventos Salvos</p>
              </div>
              <div className="stat">
                <p className="stat-value">4.7</p>
                <p className="stat-label">Avaliação Média</p>
              </div>
            </div>

            {user.bio && (
              <div className="profile-bio">
                <h2>Bio</h2>
                <p>{user.bio}</p>
              </div>
            )}

            <div className="profile-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  Informações Pessoais
                </button>
                <button
                  className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  Salvos ({user.savedEvents?.length || 0})
                </button>
                <button
                  className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`}
                  onClick={() => setActiveTab('created')}
                >
                  Criados ({user.createdEvents?.length || 0})
                </button>
              </div>

              <div className="tabs-content">
                {activeTab === 'info' && (
                  <div className="info-content">
                    <div className="info-row">
                      <span className="info-label">E-mail:</span>
                      <span className="info-text">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="info-row">
                        <span className="info-label">Telefone:</span>
                        <span className="info-text">{user.phone}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="info-row">
                        <span className="info-label">Localização:</span>
                        <span className="info-text">{user.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'saved' && (
                  <div className="events-list">
                    {loadingEvents ? (
                      <p className="loading-text">Carregando eventos salvos...</p>
                    ) : savedEvents.length > 0 ? (
                      savedEvents.map(event => (
                        <div key={event.id} className="event-item" onClick={() => navigate(`/event/${event.id}`)}>
                          <div className="event-title">{event.title}</div>
                          <div className="event-meta">
                            <span className="event-date">📅 {event.date}</span>
                            <span className="event-location">📍 {event.location}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-text">Nenhum evento salvo ainda.</p>
                    )}
                  </div>
                )}

                {activeTab === 'created' && (
                  <div className="events-list">
                    {loadingCreated ? (
                      <p className="loading-text">Carregando eventos criados...</p>
                    ) : createdEvents.length > 0 ? (
                      createdEvents.map(event => (
                        <div key={event.id} className="event-item" onClick={() => navigate(`/event/${event.id}`)}>
                          <div className="event-title">{event.title}</div>
                          <div className="event-meta">
                            <span className="event-date">📅 {event.date}</span>
                            <span className="event-location">📍 {event.location}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-text">Você ainda não criou nenhum evento.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile