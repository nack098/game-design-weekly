import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loginWithSSO = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) console.error('Login failed:', error.message)
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Logout failed:', error.message)
  }

  return { user, isAuth: !!user, loading, loginWithSSO, logout }
}
