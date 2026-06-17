import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { eventService } from '../services/eventService'
import '../styles/CreateEvent.css'

const CATEGORIES = ['Frontend', 'IA', 'DevOps', 'Web3', 'Cloud', 'Mobile']
const DEFAULT_IMAGES: Record<string, string> = {
  Frontend: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=338&fit=crop',
  IA: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=338&fit=crop',
  DevOps: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=338&fit=crop',
  Web3: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=338&fit=crop',
  Cloud: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=338&fit=crop',
  Mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=338&fit=crop',
}

function CreateEvent() {
  const navigate = useNavigate()
  const { user, isAuthenticated, addCreatedEvent } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'Frontend',
    price: '',
    capacity: '',
    description: '',
  })

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.description) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    setIsSubmitting(true)
    try {
      const dateObj = new Date(formData.date)
      const dateStr = dateObj.toLocaleDateString('pt-BR', {
        day: 'numeric', month: 'long', year: 'numeric'
      })

      const event = await eventService.createEvent({
        title: formData.title,
        date: dateStr,
        time: formData.time,
        location: formData.location,
        category: formData.category,
        image: DEFAULT_IMAGES[formData.category] || DEFAULT_IMAGES.Frontend,
        description: formData.description,
        capacity: Number(formData.capacity) || 100,
        attendees: 0,
        organizer: user?.name || 'Usuário',
        organizerImage: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=6366f1&color=fff&size=100`,
        price: Number(formData.price) || 0,
        rating: 0,
      })

      await addCreatedEvent(event.id)
      navigate(`/event/${event.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar evento.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <div className="create-header">
          <h1>Criar Novo Evento</h1>
          <p>Publique seu evento e compartilhe com a comunidade tech</p>
        </div>

        {error && <div className="create-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-row">
            <div className="form-group full">
              <label htmlFor="title">Título do Evento *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: React Summit 2026"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row triple">
            <div className="form-group">
              <label htmlFor="date">Data *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Horário *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label htmlFor="location">Local *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: São Paulo, SP - Centro de Convenções"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row triple">
            <div className="form-group">
              <label htmlFor="price">Preço (R$)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0 = Grátis"
                min="0"
                step="0.50"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacidade</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Nº de vagas"
                min="1"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label htmlFor="description">Descrição *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva seu evento, palestrantes, agenda, etc."
                rows={8}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Evento'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent