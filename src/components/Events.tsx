import { Link } from 'react-router-dom'
import './Events.css'

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'React Summit 2026',
      date: '15 de Junho',
      location: 'São Paulo, SP',
      category: 'Frontend',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=338&fit=crop',
    },
    {
      id: 2,
      title: 'AI & Machine Learning Conference',
      date: '22 de Junho',
      location: 'Rio de Janeiro, RJ',
      category: 'IA',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=338&fit=crop',
    },
    {
      id: 3,
      title: 'DevOps World',
      date: '29 de Junho',
      location: 'Belo Horizonte, MG',
      category: 'DevOps',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=338&fit=crop',
    },
    {
      id: 4,
      title: 'Web3 & Blockchain Summit',
      date: '6 de Julho',
      location: 'Curitiba, PR',
      category: 'Web3',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=338&fit=crop',
    },
    {
      id: 5,
      title: 'Cloud Architecture Bootcamp',
      date: '13 de Julho',
      location: 'Salvador, BA',
      category: 'Cloud',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=338&fit=crop',
    },
    {
      id: 6,
      title: 'Mobile Dev Conference',
      date: '20 de Julho',
      location: 'Brasília, DF',
      category: 'Mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=338&fit=crop',
    },
  ]

  return (
    <section className="events" id="events">
      <div className="container">
        <div className="section-header">
          <h2>Próximos Eventos</h2>
          <p>Confira os melhores eventos de tecnologia acontecendo em breve</p>
        </div>
        <div className="events-grid">
          {events.map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <img
                  className="event-img"
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="event-card-body">
                <span className="event-category-tag">{event.category}</span>
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <span className="event-date">📅 {event.date}</span>
                  <span className="event-location">📍 {event.location}</span>
                </div>
                <Link to={`/event/${event.id}`} className="event-link">
                  Ver detalhes →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events