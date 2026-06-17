import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { eventService } from '../services/eventService'
import { useDebounce } from '../hooks/useDebounce'
import { useAuth } from '../contexts/AuthContext'
import type { Event } from '../data/events'
import '../styles/EventSearch.css'

const ITEMS_PER_PAGE = 6

function EventSearch() {
  const { toggleSavedEvent, user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'price-low' | 'price-high'>('recent')
  const [priceRange, setPriceRange] = useState([0, 300])
  const [page, setPage] = useState(1)
  const [events, setEvents] = useState<Event[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>(['todos'])
  const [savingEvent, setSavingEvent] = useState<number | null>(null)

  const debouncedSearch = useDebounce(searchTerm, 300)

  const loadEvents = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await eventService.fetchEvents({
        searchTerm: debouncedSearch,
        category: selectedCategory,
        sortBy,
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        page,
        pageSize: ITEMS_PER_PAGE,
      })
      setEvents(result.data)
      setTotalPages(result.totalPages)
      setTotal(result.total)
    } catch (err) {
      console.error('Erro ao carregar eventos:', err)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, selectedCategory, sortBy, priceRange, page])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  useEffect(() => {
    eventService.fetchCategories().then(setCategories)
  }, [])

  // Reset página quando filtros mudam
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, selectedCategory, sortBy, priceRange])

  const handleToggleSave = async (eventId: number) => {
    setSavingEvent(eventId)
    try {
      await toggleSavedEvent(eventId)
    } catch {
      // ignora erro se não estiver autenticado
    } finally {
      setSavingEvent(null)
    }
  }

  const isSaved = (eventId: number) => user?.savedEvents?.includes(eventId)

  return (
    <div className="event-search-container">
      <section className="search-hero">
        <h1>Encontre Seu Próximo Evento</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nome do evento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {isLoading && <span className="search-spinner" aria-label="Carregando..." />}
        </div>
      </section>

      <div className="search-content">
        <aside className="filters-panel">
          <div className="filter-section">
            <h3>Categorias</h3>
            <div className="categories-list">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Faixa de Preço</h3>
            <div className="price-filter">
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <div className="price-display">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
              <button
                className="price-reset"
                onClick={() => setPriceRange([0, 0])}
              >
                Grátis
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="sort-select"
            >
              <option value="recent">Mais Recentes</option>
              <option value="popular">Mais Populares</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
            </select>
          </div>
        </aside>

        <section className="events-grid-section">
          <div className="results-header">
            <p className="results-count">
              {total} evento{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
            </p>
          </div>

          {isLoading ? (
            <div className="loading-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image" />
                  <div className="skeleton-body">
                    <div className="skeleton-line short" />
                    <div className="skeleton-line medium" />
                    <div className="skeleton-line long" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="events-grid search-grid">
                {events.map(event => (
                  <div key={event.id} className="event-card search-card">
                    <div className="event-card-image">
                      <img src={event.image} alt={event.title} loading="lazy" />
                      <span className="event-category">{event.category}</span>
                      <span className="event-price">
                        {event.price === 0 ? 'Grátis' : `R$ ${event.price.toFixed(2)}`}
                      </span>
                      {user && (
                        <button
                          className={`save-icon-btn ${isSaved(event.id) ? 'saved' : ''}`}
                          onClick={() => handleToggleSave(event.id)}
                          disabled={savingEvent === event.id}
                          aria-label={isSaved(event.id) ? 'Remover dos salvos' : 'Salvar evento'}
                        >
                          {savingEvent === event.id ? '...' : isSaved(event.id) ? '♥' : '♡'}
                        </button>
                      )}
                    </div>
                    <div className="event-card-content">
                      <h3>{event.title}</h3>
                      <div className="event-meta-info">
                        <p className="event-date">📅 {event.date}</p>
                        <p className="event-location">📍 {event.location}</p>
                        <p className="event-attendees">👥 {event.attendees} participantes</p>
                      </div>
                      <Link to={`/event/${event.id}`} className="event-card-btn">Ver Detalhes</Link>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    ← Anterior
                  </button>
                  <span className="page-info">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    className="page-btn"
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <p>Nenhum evento encontrado com os filtros selecionados.</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('todos')
                  setPriceRange([0, 300])
                  setPage(1)
                }}
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default EventSearch