import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import * as store from '../utils/authStore'
import type { UserProfile } from '../utils/authStore'
import { supabase, isSupabaseConfigured, authRedirectTo } from '../lib/supabase'

interface AuthValue {
  user: UserProfile | null
  loading: boolean
  googleEnabled: boolean
  signUp: typeof store.signUp
  signIn: typeof store.signIn
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue | undefined>(undefined)

function fromSession(session: Session | null): UserProfile | null {
  const u = session?.user
  if (!u) return null
  const meta = u.user_metadata || {}
  return {
    id: u.id,
    name: meta.full_name || meta.name || (u.email ? u.email.split('@')[0] : 'User'),
    email: u.email || '',
    avatarUrl: meta.avatar_url || meta.picture,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start from any existing localStorage (email/password) session.
  const [user, setUser] = useState<UserProfile | null>(() => store.currentUser())
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) return
    // A Google (Supabase) session takes precedence when present.
    supabase.auth.getSession().then(({ data }) => {
      const g = fromSession(data.session)
      if (g) setUser(g)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const g = fromSession(session)
      if (g) setUser(g)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthValue>(
    () => ({
      user,
      loading,
      googleEnabled: isSupabaseConfigured,
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
      signInWithGoogle: async () => {
        if (!supabase) return
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: authRedirectTo },
        })
      },
      signOut: async () => {
        await supabase?.auth.signOut()
        store.signOut()
        setUser(null)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
