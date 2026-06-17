import type { Event } from '../data/events'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  bio?: string
  location?: string
  avatar?: string
  joinDate: string
  registeredEvents: number[]
  savedEvents: number[]
  createdEvents: number[]
}

interface AuthResponse {
  user: User
  token: string
}

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const STORAGE_KEY = 'techevents_user'
const TOKEN_KEY = 'techevents_token'

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await delay(500)

    // Validação simples
    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios.')
    }

    // Simula autenticação
    const user: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      joinDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      registeredEvents: [],
      savedEvents: [],
      createdEvents: [],
    }

    const token = `tok_${crypto.randomUUID()}`

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token)

    return { user, token }
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    await delay(600)

    if (!name || !email || !password) {
      throw new Error('Todos os campos são obrigatórios.')
    }

    if (password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres.')
    }

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      joinDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      registeredEvents: [],
      savedEvents: [],
      createdEvents: [],
    }

    const token = `tok_${crypto.randomUUID()}`

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token)

    return { user, token }
  },

  async logout(): Promise<void> {
    await delay(100)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    try {
      return JSON.parse(stored) as User
    } catch {
      return null
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY) && !!this.getCurrentUser()
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    await delay(300)
    const current = this.getCurrentUser()
    if (!current) throw new Error('Usuário não autenticado.')

    const updated: User = { ...current, ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  },

  async toggleSavedEvent(eventId: number): Promise<User> {
    const current = this.getCurrentUser()
    if (!current) throw new Error('Usuário não autenticado.')

    const saved = current.savedEvents
    const index = saved.indexOf(eventId)
    if (index >= 0) {
      saved.splice(index, 1)
    } else {
      saved.push(eventId)
    }

    const updated: User = { ...current, savedEvents: [...saved] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  },

  async addCreatedEvent(eventId: number): Promise<User> {
    const current = this.getCurrentUser()
    if (!current) throw new Error('Usuário não autenticado.')

    const created = current.createdEvents
    if (!created.includes(eventId)) {
      created.push(eventId)
    }

    const updated: User = { ...current, createdEvents: [...created] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  },
}
