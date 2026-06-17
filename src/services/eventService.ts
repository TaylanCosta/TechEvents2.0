import { eventsDatabase } from '../data/events'
import type { Event } from '../data/events'

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

export interface EventFilters {
  searchTerm?: string
  category?: string
  sortBy?: 'recent' | 'popular' | 'price-low' | 'price-high'
  priceMin?: number
  priceMax?: number
  page?: number
  pageSize?: number
}

// Simula latência de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const EVENTS_KEY = 'techevents_custom_events'

function getCustomEvents(): Event[] {
  try {
    const data = localStorage.getItem(EVENTS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

let nextCustomId = 100

export function generateEventId(): number {
  return ++nextCustomId
}

export const eventService = {
  async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    await delay(400)
    const newEvent: Event = {
      id: generateEventId(),
      ...eventData,
    }
    const events = getCustomEvents()
    events.unshift(newEvent)
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
    return newEvent
  },

  getAllEvents(): Event[] {
    return [...eventsDatabase, ...getCustomEvents()]
  },

  async fetchEvents(filters: EventFilters = {}): Promise<PaginatedResult<Event>> {
    await delay(300) // Simula requisição HTTP

    const {
      searchTerm = '',
      category = 'todos',
      sortBy = 'recent',
      priceMin = 0,
      priceMax = 300,
      page = 1,
      pageSize = 6,
    } = filters

    let filtered = this.getAllEvents()

    // Filtro por categoria
    if (category !== 'todos') {
      filtered = filtered.filter(e => e.category === category)
    }

    // Filtro por nome (case insensitive)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(term)
      )
    }

    // Filtro por preço
    filtered = filtered.filter(e => e.price >= priceMin && e.price <= priceMax)

    // Ordenação
    if (sortBy === 'recent') {
      filtered = filtered.reverse()
    } else if (sortBy === 'popular') {
      filtered = filtered.sort((a, b) => b.attendees - a.attendees)
    } else if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price)
    }

    // Paginação
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize)

    return {
      data: paginatedData,
      total,
      page,
      totalPages,
    }
  },

  async fetchEventById(id: number): Promise<Event | null> {
    await delay(200)
    const event = this.getAllEvents().find(e => e.id === id)
    return event ?? null
  },

  async fetchCategories(): Promise<string[]> {
    await delay(100)
    const cats = new Set(this.getAllEvents().map(e => e.category))
    return ['todos', ...cats]
  },
}