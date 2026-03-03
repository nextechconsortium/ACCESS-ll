"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, Lock, User, Phone, BookOpen, Briefcase } from "lucide-react"

interface AuthFormProps {
  mode: "signin" | "signup"
  onSubmit: (data: SignupFormData | SigninFormData) => Promise<void>
  isLoading: boolean
}

export interface SignupFormData {
  fullName: string
  username: string
  email: string
  phone: string
  educationLevel: string
  careerInterests: string[]
  kcseCompleted: boolean
  password: string
  confirmPassword: string
}

export interface SigninFormData {
  email: string
  password: string
}

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

export function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Signup form state
  const [signupData, setSignupData] = useState<SignupFormData>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    educationLevel: "",
    careerInterests: [],
    kcseCompleted: false,
    password: "",
    confirmPassword: "",
  })

  // Signin form state
  const [signinData, setSigninData] = useState<SigninFormData>({
    email: "",
    password: "",
  })

  const validateSignup = () => {
    const newErrors: Record<string, string> = {}

    if (!signupData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!signupData.username.trim()) newErrors.username = "Username is required"
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(signupData.username)) {
      newErrors.username = "Username must be 3-20 characters (letters, numbers, underscores)"
    }
    if (!signupData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!signupData.educationLevel) newErrors.educationLevel = "Education level is required"
    if (signupData.careerInterests.length === 0) {
      newErrors.careerInterests = "Select at least one career interest"
    }
    if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignin = () => {
    const newErrors: Record<string, string> = {}

    if (!signinData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!signinData.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateSignup()) {
      await onSubmit(signupData)
    }
  }

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateSignin()) {
      await onSubmit(signinData)
    }
  }

  const toggleCareerInterest = (interest: string) => {
    setSignupData((prev) => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(interest)
        ? prev.careerInterests.filter((i) => i !== interest)
        : [...prev.careerInterests, interest],
    }))
  }

  if (mode === "signin") {
    return (
      <form onSubmit={handleSigninSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={signinData.email}
              onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
              disabled={isLoading}
              className="pl-10"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={signinData.password}
              onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
              disabled={isLoading}
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-[#2066c3] hover:bg-[#1a5aaa]">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#2066c3] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleSignupSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="John Doe"
            value={signupData.fullName}
            onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
            disabled={isLoading}
            className="pl-10"
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
        <Input
          type="text"
          placeholder="johndoe_123"
          value={signupData.username}
          onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
          disabled={isLoading}
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            disabled={isLoading}
            className="pl-10"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number (Optional)</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            type="tel"
            placeholder="+254 712 345 678"
            value={signupData.phone}
            onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
            disabled={isLoading}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Education Level</label>
        <select
          value={signupData.educationLevel}
          onChange={(e) => setSignupData({ ...signupData, educationLevel: e.target.value })}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2066c3]"
        >
          <option value="">Select education level</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Career Interests</label>
        <div className="grid grid-cols-2 gap-2">
          {careerInterestOptions.map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={signupData.careerInterests.includes(interest)}
                onChange={() => toggleCareerInterest(interest)}
                disabled={isLoading}
                className="rounded border-slate-300"
              />
              <span className="ml-2 text-sm text-slate-700">{interest}</span>
            </label>
          ))}
        </div>
        {errors.careerInterests && <p className="text-red-500 text-xs mt-1">{errors.careerInterests}</p>}
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={signupData.kcseCompleted}
            onChange={(e) => setSignupData({ ...signupData, kcseCompleted: e.target.checked })}
            disabled={isLoading}
            className="rounded border-slate-300"
          />
          <span className="ml-2 text-sm text-slate-700">I have completed KCSE</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            disabled={isLoading}
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={signupData.confirmPassword}
            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            disabled={isLoading}
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-[#2066c3] hover:bg-[#1a5aaa]">
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/signin" className="text-[#2066c3] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
