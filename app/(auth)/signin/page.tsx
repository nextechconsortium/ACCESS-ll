"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AuthForm, SigninFormData } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function SigninPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  console.log("[v0] Sign In page loaded")

  useEffect(() => {
    // Get success message from URL params
    const message = searchParams.get("message")
    if (message) {
      setSuccessMessage(decodeURIComponent(message))
    }
  }, [searchParams])

  const handleSignin = async (data: SigninFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to sign in")
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during signin")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/google", {
        method: "GET",
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError("Failed to initiate Google signin")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2066c3] via-[#1a5aaa] to-[#0f3d6e] text-white flex-col justify-between p-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">ACCESS</h1>
          <p className="text-[#b3d9ff] text-lg">Your pathway to excellence</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-[#b3d9ff] leading-relaxed">
              Access your profile, explore new opportunities, and continue your journey towards success.
            </p>
          </div>

          <div className="space-y-3 text-sm text-[#b3d9ff]">
            <p>✓ Connect with experienced mentors</p>
            <p>✓ Discover scholarship opportunities</p>
            <p>✓ Explore career paths</p>
            <p>✓ Join our community</p>
          </div>
        </div>

        <p className="text-[#8ab3ff] text-sm">
          Part of the NexTech education ecosystem
        </p>
      </div>

      {/* Right Side - Signin Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-600">Continue your journey</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <Button
              onClick={handleGoogleSignin}
              disabled={isLoading}
              variant="outline"
              className="w-full border-slate-300 hover:bg-slate-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with email</span>
            </div>
          </div>

          <AuthForm mode="signin" onSubmit={handleSignin} isLoading={isLoading} />

          <div className="mt-6 text-center text-sm">
            <Link href="#" className="text-[#2066c3] hover:underline">
              Forgot your password?
            </Link>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#2066c3] hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
