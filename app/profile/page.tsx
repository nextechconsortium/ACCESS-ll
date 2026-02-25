"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Save, User, Mail, MapPin, GraduationCap, Award, Settings, Bell, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface UserProfile {
  displayName: string
  email: string
  phone: string
  bio: string
  location: string
  dateOfBirth: string
  educationLevel: string
  fieldOfInterest: string
  university: string
  graduationYear: string
  skills: string[]
  achievements: string[]
  socialLinks: {
    linkedin: string
    twitter: string
    github: string
    website: string
  }
  preferences: {
    emailNotifications: boolean
    pushNotifications: boolean
    profileVisibility: string
    mentorshipAvailability: boolean
  }
  profileImage: string
  coverImage: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile>({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
    dateOfBirth: "",
    educationLevel: "",
    fieldOfInterest: "",
    university: "",
    graduationYear: "",
    skills: [],
    achievements: [],
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
      website: "",
    },
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      profileVisibility: "public",
      mentorshipAvailability: false,
    },
    profileImage: "",
    coverImage: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [newAchievement, setNewAchievement] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialLinkChange = (platform: keyof UserProfile["socialLinks"], value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const handlePreferenceChange = (preference: keyof UserProfile["preferences"], value: any) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addAchievement = () => {
    if (newAchievement.trim() && !profile.achievements.includes(newAchievement.trim())) {
      setProfile((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }))
      setNewAchievement("")
    }
  }

  const removeAchievement = (achievement: string) => {
    setProfile((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a !== achievement),
    }))
  }

  const handleImageUpload = (type: "profile" | "cover") => {
    const input = type === "profile" ? fileInputRef.current : coverInputRef.current
    if (input) {
      input.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        if (type === "profile") {
          setProfile((prev) => ({ ...prev, profileImage: imageUrl }))
        } else {
          setProfile((prev) => ({ ...prev, coverImage: imageUrl }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Here you would typically save to your backend/database
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <div className="futuristic-bg"></div>
        <div className="content-wrapper">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4 text-white">Access Denied</h1>
            <p className="text-white/70 mb-8">Please sign in to view your profile.</p>
            <Button asChild className="neon-button text-white">
              <a href="/auth">Sign In</a>
            </Button>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg"></div>
      <div className="content-wrapper">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cover Image */}
          <div className="relative mb-8">
            <div
              className="h-48 md:h-64 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden cursor-pointer group"
              onClick={() => handleImageUpload("cover")}
            >
              {profile.coverImage && (
                <img
                  src={profile.coverImage || "/placeholder.svg"}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Change Cover Photo</p>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <Avatar
                  className="w-32 h-32 border-4 border-white/20 cursor-pointer group"
                  onClick={() => handleImageUpload("profile")}
                >
                  <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.displayName} />
                  <AvatarFallback className="bg-cyan-500/20 text-cyan-300 text-2xl">
                    {profile.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                </Avatar>
              </div>
            </div>

            {/* Edit Button */}
            <div className="absolute top-4 right-4">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={
                  isEditing ? "neon-button text-white" : "glass-card border-white/20 text-white bg-transparent"
                }
              >
                {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profile")}
            className="hidden"
          />
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "cover")}
            className="hidden"
          />

          {/* Profile Header */}
          <div className="mb-8 pt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{profile.displayName || "Your Name"}</h1>
                <p className="text-white/70 mb-4">{profile.bio || "Add a bio to tell others about yourself"}</p>
                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  )}
                  {profile.university && (
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {profile.university}
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {profile.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="glass-card mb-8">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white/20 text-white">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-white/20 text-white">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-white/20 text-white">
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white/20 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="futuristic-card">
                    <CardHeader>
                      <CardTitle className="text-white">Personal Information</CardTitle>
                      <CardDescription className="text-white/70">
                        Update your personal details and contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Full Name</label>
                          <Input
                            value={profile.displayName}
                            onChange={(e) => handleInputChange("displayName", e.target.value)}
                            disabled={!isEditing}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Email</label>
                          <Input
                            value={profile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={!isEditing}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Phone</label>
                          <Input
                            value={profile.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={!isEditing}
                            placeholder="+254 700 000 000"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Location</label>
                          <Input
                            value={profile.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            disabled={!isEditing}
                            placeholder="Nairobi, Kenya"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Date of Birth</label>
                          <Input
                            type="date"
                            value={profile.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            disabled={!isEditing}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Field of Interest</label>
                          <Select
                            value={profile.fieldOfInterest}
                            onValueChange={(value) => handleInputChange("fieldOfInterest", value)}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select your field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="medicine">Medicine</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="engineering">Engineering</SelectItem>
                              <SelectItem value="arts">Arts & Design</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="law">Law</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">Bio</label>
                        <Textarea
                          value={profile.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          disabled={!isEditing}
                          placeholder="Tell us about yourself, your interests, and goals..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="futuristic-card">
                    <CardHeader>
                      <CardTitle className="text-white">Social Links</CardTitle>
                      <CardDescription className="text-white/70">Connect your social media profiles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">LinkedIn</label>
                          <Input
                            value={profile.socialLinks.linkedin}
                            onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                            disabled={!isEditing}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Twitter</label>
                          <Input
                            value={profile.socialLinks.twitter}
                            onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                            disabled={!isEditing}
                            placeholder="https://twitter.com/yourusername"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">GitHub</label>
                          <Input
                            value={profile.socialLinks.github}
                            onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                            disabled={!isEditing}
                            placeholder="https://github.com/yourusername"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Website</label>
                          <Input
                            value={profile.socialLinks.website}
                            onChange={(e) => handleSocialLinkChange("website", e.target.value)}
                            disabled={!isEditing}
                            placeholder="https://yourwebsite.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="futuristic-card">
                    <CardHeader>
                      <CardTitle className="text-white">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {profile.skills.map((skill, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                              {skill}
                            </Badge>
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSkill(skill)}
                                className="text-red-400 hover:text-red-300"
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <div className="flex gap-2">
                            <Input
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="Add a skill"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                              onKeyPress={(e) => e.key === "Enter" && addSkill()}
                            />
                            <Button onClick={addSkill} size="sm" className="neon-button text-white">
                              Add
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="futuristic-card">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Profile Completion</span>
                        <span className="text-cyan-400 font-semibold">75%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Connections</span>
                        <span className="text-purple-400 font-semibold">42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Posts</span>
                        <span className="text-green-400 font-semibold">18</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white">Education & Career</CardTitle>
                  <CardDescription className="text-white/70">
                    Your academic background and career information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Education Level</label>
                      <Select
                        value={profile.educationLevel}
                        onValueChange={(value) => handleInputChange("educationLevel", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">University/Institution</label>
                      <Input
                        value={profile.university}
                        onChange={(e) => handleInputChange("university", e.target.value)}
                        disabled={!isEditing}
                        placeholder="University of Nairobi"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Graduation Year</label>
                      <Input
                        value={profile.graduationYear}
                        onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                        disabled={!isEditing}
                        placeholder="2025"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card className="futuristic-card">
                <CardHeader>
                  <CardTitle className="text-white">Achievements & Awards</CardTitle>
                  <CardDescription className="text-white/70">
                    Showcase your accomplishments and recognition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-yellow-400" />
                          <span className="text-white">{achievement}</span>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAchievement(achievement)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          placeholder="Add an achievement"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          onKeyPress={(e) => e.key === "Enter" && addAchievement()}
                        />
                        <Button onClick={addAchievement} size="sm" className="neon-button text-white">
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card className="futuristic-card">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Email Notifications</h4>
                        <p className="text-white/60 text-sm">Receive updates via email</p>
                      </div>
                      <Button
                        variant={profile.preferences.emailNotifications ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          handlePreferenceChange("emailNotifications", !profile.preferences.emailNotifications)
                        }
                        className={
                          profile.preferences.emailNotifications
                            ? "neon-button text-white"
                            : "glass-card border-white/20 text-white bg-transparent"
                        }
                      >
                        {profile.preferences.emailNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Push Notifications</h4>
                        <p className="text-white/60 text-sm">Receive push notifications</p>
                      </div>
                      <Button
                        variant={profile.preferences.pushNotifications ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          handlePreferenceChange("pushNotifications", !profile.preferences.pushNotifications)
                        }
                        className={
                          profile.preferences.pushNotifications
                            ? "neon-button text-white"
                            : "glass-card border-white/20 text-white bg-transparent"
                        }
                      >
                        {profile.preferences.pushNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="futuristic-card">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Profile Visibility</label>
                      <Select
                        value={profile.preferences.profileVisibility}
                        onValueChange={(value) => handlePreferenceChange("profileVisibility", value)}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="connections">Connections Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Available for Mentorship</h4>
                        <p className="text-white/60 text-sm">Allow others to request mentorship</p>
                      </div>
                      <Button
                        variant={profile.preferences.mentorshipAvailability ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          handlePreferenceChange("mentorshipAvailability", !profile.preferences.mentorshipAvailability)
                        }
                        className={
                          profile.preferences.mentorshipAvailability
                            ? "neon-button text-white"
                            : "glass-card border-white/20 text-white bg-transparent"
                        }
                      >
                        {profile.preferences.mentorshipAvailability ? "Available" : "Not Available"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          {isEditing && (
            <div className="fixed bottom-8 right-8">
              <Button onClick={handleSave} size="lg" className="neon-button text-white shadow-lg">
                <Save className="h-5 w-5 mr-2" />
                Save All Changes
              </Button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  )
}
