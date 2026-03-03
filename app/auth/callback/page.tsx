"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!supabase) {
          throw new Error("Supabase client not initialized")
        }

        console.log("[v0] Processing OAuth callback...")

        // Get the session from URL parameters (Supabase sets this)
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("[v0] Session error:", sessionError.message)
          throw new Error(`Session error: ${sessionError.message}`)
        }

        const session = data?.session

        if (!session) {
          console.log("[v0] No session found, redirecting to signin")
          router.push("/signin?error=No session found. Please try again.")
          return
        }

        console.log("[v0] OAuth session established:", {
          userId: session.user?.id,
          email: session.user?.email,
        })

        // Check if user profile exists
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", session.user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          // PGRST116 means no rows found (user is new)
          console.error("[v0] Profile check error:", profileError.message)
          throw new Error(`Profile check failed: ${profileError.message}`)
        }

        if (!profileData) {
          // New user - redirect to complete profile
          console.log("[v0] New user detected, redirecting to profile completion")
          router.push("/auth/complete-profile")
        } else {
          // Existing user - redirect to dashboard
          console.log("[v0] Existing user detected, redirecting to dashboard")
          router.push("/dashboard")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        console.error("[v0] OAuth callback error:", errorMessage)
        setError(errorMessage)
      } finally {
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Authentication Error</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a
            href="/signin"
            className="inline-block px-6 py-2 bg-[#2066c3] text-white rounded-lg hover:bg-[#1a5aaa] transition-colors"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2066c3]"></div>
        </div>
        <p className="text-slate-600">Completing your authentication...</p>
      </div>
    </div>
  )
}
