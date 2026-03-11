import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  authButtons: Record<string, Record<string, boolean>>
  authRouter: string[]
  setAuthButtons: (buttons: Record<string, Record<string, boolean>>) => void
  setAuthRouter: (routes: string[]) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      authButtons: {},
      authRouter: [],
      setAuthButtons: (authButtons) => set({ authButtons }),
      setAuthRouter: (authRouter) => set({ authRouter }),
    }),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
