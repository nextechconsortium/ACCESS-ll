"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock, User, GraduationCap, MapPin, Calendar, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  fullName: string
  email: string
  age: string
  location: string
  educationLevel: string
  fieldOfInterest: string
  bio: string
  goals: string
}

export default function AuthPage() {
  // Sign in states
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [showSignInPassword, setShowSignInPassword] = useState(false)

  // Sign up states
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // General states
  const [loading, setLoading] = useState(false)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [activeTab, setActiveTab] = useState("signin")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    age: "",
    location: "",
    educationLevel: "",
    fieldOfInterest: "",
    bio: "",
    goals: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(signInEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (!validatePassword(signInPassword)) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      const user = userCredential.user

      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))

      toast({
        title: "Welcome back!",
        description: `Signed in as ${user.email}`,
      })

      router.push("/")
    } catch (error: any) {
      console.error("Sign in error:", error)

      let errorMessage = "An error occurred during sign in."

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address."
          break
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again."
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address format."
          break
        case "auth/user-disabled":
          errorMessage = "This account has been disabled."
          break
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection."
          break
        default:
          errorMessage = error.message || "Sign in failed. Please try again."
      }

      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUpInitial = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(signUpEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (!validatePassword(signUpPassword)) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    if (signUpPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    setUserProfile((prev) => ({ ...prev, email: signUpEmail }))
    setShowProfileForm(true)
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userProfile.fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      const user = userCredential.user

      // Update user profile
      await updateProfile(user, {
        displayName: userProfile.fullName,
      })

      // Save additional profile data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: userProfile.fullName,
        email: userProfile.email,
        age: userProfile.age,
        location: userProfile.location,
        educationLevel: userProfile.educationLevel,
        fieldOfInterest: userProfile.fieldOfInterest,
        bio: userProfile.bio,
        goals: userProfile.goals,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      toast({
        title: "Account Created Successfully!",
        description: "Welcome to ACCESS platform. Your profile has been set up.",
      })

      router.push("/")
    } catch (error: any) {
      console.error("Sign up error:", error)

      let errorMessage = "An error occurred during account creation."

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists."
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address format."
          break
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled."
          break
        case "auth/weak-password":
          errorMessage = "Password is too weak. Please choose a stronger password."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection."
          break
        default:
          errorMessage = error.message || "Account creation failed. Please try again."
      }

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    provider.addScope("email")
    provider.addScope("profile")

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if user document exists
      const userDocRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userDocRef)

      // If new user, create profile document
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          fullName: user.displayName || "",
          email: user.email || "",
          age: "",
          location: "",
          educationLevel: "",
          fieldOfInterest: "",
          bio: "",
          goals: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          signInMethod: "google",
        })
      }

      toast({
        title: "Welcome!",
        description: `Signed in successfully with Google as ${user.email}`,
      })

      router.push("/")
    } catch (error: any) {
      console.error("Google sign in error:", error)

      let errorMessage = "Google sign in failed."

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Sign in was cancelled."
          break
        case "auth/popup-blocked":
          errorMessage = "Popup was blocked. Please allow popups and try again."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection."
          break
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please try again later."
          break
        default:
          errorMessage = error.message || "Google sign in failed. Please try again."
      }

      toast({
        title: "Google Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setSignInEmail("")
    setSignInPassword("")
    setSignUpEmail("")
    setSignUpPassword("")
    setConfirmPassword("")
    setShowProfileForm(false)
    setUserProfile({
      fullName: "",
      email: "",
      age: "",
      location: "",
      educationLevel: "",
      fieldOfInterest: "",
      bio: "",
      goals: "",
    })
  }

  if (showProfileForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative w-32 h-28 md:w-40 md:h-32">
                <Image
                  src="/images/access-logo.png"
                  alt="ACCESS Logo"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
            <p className="text-muted-foreground">Tell us about yourself to get personalized recommendations</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                This information helps us connect you with the right mentors and opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your full name"
                        value={userProfile.fullName}
                        onChange={(e) => handleProfileChange("fullName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Your age"
                        value={userProfile.age}
                        onChange={(e) => handleProfileChange("age", e.target.value)}
                        className="pl-10"
                        min="13"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="City, Country"
                        value={userProfile.location}
                        onChange={(e) => handleProfileChange("location", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Education Level</label>
                    <Select
                      value={userProfile.educationLevel}
                      onValueChange={(value) => handleProfileChange("educationLevel", value)}
                    >
                      <SelectTrigger>
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Field of Interest</label>
                  <Select
                    value={userProfile.fieldOfInterest}
                    onValueChange={(value) => handleProfileChange("fieldOfInterest", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What field interests you most?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicine">Medicine & Healthcare</SelectItem>
                      <SelectItem value="technology">Technology & Engineering</SelectItem>
                      <SelectItem value="business">Business & Finance</SelectItem>
                      <SelectItem value="law">Law & Legal Studies</SelectItem>
                      <SelectItem value="education">Education & Teaching</SelectItem>
                      <SelectItem value="arts">Arts & Creative Fields</SelectItem>
                      <SelectItem value="science">Science & Research</SelectItem>
                      <SelectItem value="social-work">Social Work & NGO</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tell us about yourself</label>
                  <Textarea
                    placeholder="Share your background, interests, and what you're passionate about..."
                    value={userProfile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Goals</label>
                  <Textarea
                    placeholder="What are your academic and career goals? What do you hope to achieve?"
                    value={userProfile.goals}
                    onChange={(e) => handleProfileChange("goals", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowProfileForm(false)
                      resetForm()
                    }}
                    className="flex-1"
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading || !userProfile.fullName.trim()}>
                    {loading ? "Creating Account..." : "Complete Registration"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative w-32 h-28 md:w-40 md:h-32">
              <Image
                src="/images/access-logo.png"
                alt="ACCESS Logo"
                fill
                className="object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>
          <p className="text-muted-foreground mt-2">Join the movement towards academic success</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showSignInPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        disabled={loading}
                      >
                        {showSignInPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUpInitial} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showSignUpPassword ? "text" : "password"}
                        placeholder="Password (min 6 characters)"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="pl-10 pr-10"
                        minLength={6}
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        disabled={loading}
                      >
                        {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10"
                        minLength={6}
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Continue to Profile Setup"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleSignIn} disabled={loading}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
