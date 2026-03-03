"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle } from "lucide-react"

const educationLevels = [
  "Currently in School",
  "Completed KCSE",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
]

const careerInterestOptions = [
  "Technology",
  "Business",
  "Engineering",
  "Healthcare",
  "Education",
  "Law",
  "Arts",
  "Sciences",
  "Entrepreneurship",
]

export default function CompleteProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    educationLevel: "",
    careerInterests: [] as string[],
    phone: "",
  })

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) {
        setError("Supabase client not initialized")
        setIsLoading(false)
        return
      }

      const { data, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !data?.session?.user) {
        console.error("[v0] No authenticated user found")
        router.push("/signin")
        return
      }

      setUser(data.session.user)
      setFormData((prev) => ({
        ...prev,
        username: data.session.user.user_metadata?.username || "",
      }))
      setIsLoading(false)
    }

    getUser()
  }, [router])

  const handleCareerInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(interest)
        ? prev.careerInterests.filter((i) => i !== interest)
        : [...prev.careerInterests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      if (!user) {
        throw new Error("No authenticated user")
      }

      if (!formData.username.trim()) {
        throw new Error("Username is required")
      }

      if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
        throw new Error("Username must be 3-20 characters (letters, numbers, underscores)")
      }

      if (!formData.educationLevel) {
        throw new Error("Please select an education level")
      }

      if (formData.careerInterests.length === 0) {
        throw new Error("Please select at least one career interest")
      }

      if (!supabase) {
        throw new Error("Supabase client not initialized")
      }

      // Check username availability
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", formData.username)
        .single()

      if (existingUser) {
        throw new Error("Username already taken")
      }

      // Insert profile
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          full_name: user.user_metadata?.full_name || "",
          username: formData.username,
          email: user.email,
          phone_number: formData.phone || null,
          education_level: formData.educationLevel,
          career_interests: formData.careerInterests,
        },
      ])

      if (insertError) {
        console.error("[v0] Profile insert error:", {
          message: insertError.message,
          details: insertError.details,
        })
        throw new Error(insertError.message || "Failed to save profile")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      console.error("[v0] Profile completion error:", errorMessage)
      setError(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2066c3] mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h1>
          <p className="text-slate-600 mb-8">
            Just a few more details to get your ACCESS account set up
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Success!</h3>
                <p className="text-green-700 text-sm">Profile created. Redirecting to dashboard...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Username</label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your username"
                disabled={isSaving}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">3-20 characters, letters, numbers, underscores</p>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Education Level</label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData((prev) => ({ ...prev, educationLevel: e.target.value }))}
                disabled={isSaving}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2066c3]"
              >
                <option value="">Select education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Career Interests */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">Career Interests</label>
              <div className="grid grid-cols-2 gap-3">
                {careerInterestOptions.map((interest) => (
                  <label key={interest} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.careerInterests.includes(interest)}
                      onChange={() => handleCareerInterestToggle(interest)}
                      disabled={isSaving}
                      className="w-4 h-4 rounded border-slate-300 text-[#2066c3]"
                    />
                    <span className="text-sm text-slate-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phone Number (optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Phone Number (optional)</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                disabled={isSaving}
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full neon-button text-white font-semibold py-3"
            >
              {isSaving ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
