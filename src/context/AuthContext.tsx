import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import * as store from '../utils/authStore'
import type { UserProfile } from '../utils/authStore'

interface AuthValue {
  user: UserProfile | null
  signUp: typeof store.signUp
  signIn: typeof store.signIn
  signOut: () => void
}

const AuthContext = createContext<AuthValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => store.currentUser())

  const value = useMemo<AuthValue>(
    () => ({
      user,
      signUp: (input) => {
        const res = store.signUp(input)
        if (res.ok) setUser(res.user)
        return res
      },
      signIn: (email, password) => {
        const res = store.signIn(email, password)
        if (res.ok) setUser(res.user)
        return res
      },
      signOut: () => {
        store.signOut()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
