"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import type { Session } from "@supabase/supabase-js"

interface AuthContextType {
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        if (!supabase) {
          console.warn("[v0] Supabase client not initialized - auth features unavailable")
          setLoading(false)
          return
        }

        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession()
        setSession(currentSession)
      } catch (error) {
        console.error("[v0] Session check error:", error instanceof Error ? error.message : error)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth state changes
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("[v0] Auth state changed:", event)
        setSession(session)
      })

      return () => {
        subscription?.unsubscribe()
      }
    }
  }, [])

  const signOut = async () => {
    try {
      if (!supabase) {
        console.error("[v0] Supabase client not initialized")
        return
      }

      await supabase.auth.signOut()
      setSession(null)
      router.push("/")
    } catch (error) {
      console.error("[v0] Sign out error:", error instanceof Error ? error.message : error)
    }
  }

  const value = {
    session,
    loading,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
