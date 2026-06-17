import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authService, type User } from '../services/authService'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  toggleSavedEvent: (eventId: number) => Promise<void>
  addCreatedEvent: (eventId: number) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { user: loggedUser } = await authService.login(email, password)
    setUser(loggedUser)
  }

  const register = async (name: string, email: string, password: string) => {
    const { user: newUser } = await authService.register(name, email, password)
    setUser(newUser)
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const updateProfile = async (updates: Partial<User>) => {
    const updated = await authService.updateProfile(updates)
    setUser(updated)
  }

  const toggleSavedEvent = async (eventId: number) => {
    const updated = await authService.toggleSavedEvent(eventId)
    setUser(updated)
  }

  const addCreatedEvent = async (eventId: number) => {
    const updated = await authService.addCreatedEvent(eventId)
    setUser(updated)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        toggleSavedEvent,
        addCreatedEvent,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return ctx
}