"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Filter, MessageCircle, Star, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Mentor {
  id: string
  name: string
  field: string
  bio: string
  image: string
  rating: number
  experience: string
  specialties: string[]
  whatsapp: string
  telegram: string
  email: string
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    field: "Medicine",
    bio: "Experienced cardiologist with 15+ years in clinical practice and medical education.",
    image: "/images/dr-sarah-johnson.jpg",
    rating: 4.9,
    experience: "15+ years",
    specialties: ["Cardiology", "Medical Education", "Research"],
    whatsapp: "+1234567890",
    telegram: "@sarahjohnson",
    email: "sarah.johnson@medicenter.com",
  },
  {
    id: "2",
    name: "James Mitchell",
    field: "Technology",
    bio: "Senior Software Engineer at Google with expertise in AI and machine learning.",
    image: "/images/james-mitchell.jpg",
    rating: 4.8,
    experience: "12+ years",
    specialties: ["AI/ML", "Software Development", "Career Guidance"],
    whatsapp: "+1234567891",
    telegram: "@jamesmitchell",
    email: "james.mitchell@techcorp.com",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    field: "Law",
    bio: "Corporate lawyer specializing in international business law and compliance.",
    image: "/images/maria-rodriguez.jpg",
    rating: 4.7,
    experience: "10+ years",
    specialties: ["Corporate Law", "International Business", "Compliance"],
    whatsapp: "+1234567892",
    telegram: "@mariarodriguez",
    email: "maria.rodriguez@lawfirm.com",
  },
  {
    id: "4",
    name: "David Chen",
    field: "Engineering",
    bio: "Mechanical engineer with expertise in renewable energy and sustainable design.",
    image: "/images/david-chen.jpg",
    rating: 4.6,
    experience: "8+ years",
    specialties: ["Renewable Energy", "Sustainable Design", "Project Management"],
    whatsapp: "+1234567893",
    telegram: "@davidchen",
    email: "david.chen@greentech.com",
  },
  {
    id: "5",
    name: "Dr. Amina Hassan",
    field: "Psychology",
    bio: "Clinical psychologist specializing in adolescent mental health and career counseling.",
    image: "/images/dr-amina-hassan.jpg",
    rating: 4.9,
    experience: "12+ years",
    specialties: ["Clinical Psychology", "Career Counseling", "Adolescent Mental Health"],
    whatsapp: "+1234567894",
    telegram: "@aminahassan",
    email: "amina.hassan@psychcenter.com",
  },
  {
    id: "6",
    name: "Robert Thompson",
    field: "Business",
    bio: "Entrepreneur and business consultant with multiple successful startups.",
    image: "/images/robert-thompson.jpg",
    rating: 4.8,
    experience: "20+ years",
    specialties: ["Entrepreneurship", "Business Strategy", "Startup Consulting"],
    whatsapp: "+1234567895",
    telegram: "@robertthompson",
    email: "robert.thompson@bizcons.com",
  },
]

const fields = ["All Fields", "Medicine", "Technology", "Law", "Engineering", "Psychology", "Business"]

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("All Fields")
  const [filteredMentors, setFilteredMentors] = useState(mentors)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)

  useEffect(() => {
    let filtered = mentors

    if (searchTerm) {
      filtered = filtered.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedField !== "All Fields") {
      filtered = filtered.filter((mentor) => mentor.field === selectedField)
    }

    setFilteredMentors(filtered)
  }, [searchTerm, selectedField])

  const handleConnect = (platform: "whatsapp" | "telegram" | "gmail", contact: string, mentorName?: string) => {
    let url = ""

    switch (platform) {
      case "whatsapp":
        const message = `Hello ${mentorName}, I found your profile on ACCESS platform and would like to connect with you for mentorship guidance. Looking forward to hearing from you!`
        url = `https://wa.me/${contact.replace("+", "")}?text=${encodeURIComponent(message)}`
        break
      case "telegram":
        url = `https://t.me/${contact.replace("@", "")}`
        break
      case "gmail":
        const subject = `Mentorship Request - ACCESS Platform`
        const body = `Dear ${mentorName},

I hope this email finds you well. I came across your profile on the ACCESS platform and was impressed by your expertise in ${selectedMentor?.field} and your experience in ${selectedMentor?.specialties.join(", ")}.

I am currently seeking guidance and mentorship in my academic and career journey, and I believe your insights would be invaluable to me. I would be grateful for the opportunity to connect with you and learn from your experience.

Could we schedule a brief conversation at your convenience? I am flexible with timing and can accommodate your schedule.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
ACCESS Platform Student`
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
    }

    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg"></div>
      <div className="content-wrapper">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Find Your Mentor</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Connect with experienced professionals who can guide you on your academic and career journey. Get
              personalized advice from industry experts.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-cyan mb-2">{mentors.length}</div>
                  <div className="text-sm text-white/70">Expert Mentors</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-magenta mb-2">{fields.length - 1}</div>
                  <div className="text-sm text-white/70">Fields Covered</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-violet mb-2">4.8</div>
                  <div className="text-sm text-white/70">Average Rating</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-sm text-white/70">Response Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="futuristic-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search mentors by name, field, or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="futuristic-card hover:scale-105 transition-all duration-300">
                <div className="aspect-square relative rounded-t-lg overflow-hidden">
                  <Image
                    src={mentor.image || "/placeholder.svg?height=300&width=300&query=professional mentor"}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-black/70 rounded-full px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-white text-xs font-medium">{mentor.rating}</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{mentor.name}</CardTitle>
                      <CardDescription className="neon-cyan font-medium">{mentor.field}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                      {mentor.experience}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70 text-sm line-clamp-3">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs bg-white/10 text-white/80">
                        {specialty}
                      </Badge>
                    ))}
                    {mentor.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-white/5 text-white/60 border-white/20">
                        +{mentor.specialties.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 neon-button text-white border-white/20 bg-transparent"
                          onClick={() => setSelectedMentor(mentor)}
                        >
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="futuristic-card max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-4 text-white">
                            <div className="w-16 h-16 relative rounded-full overflow-hidden">
                              <Image
                                src={mentor.image || "/placeholder.svg?height=64&width=64&query=professional mentor"}
                                alt={mentor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{mentor.name}</h3>
                              <p className="neon-cyan font-medium">{mentor.field}</p>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm text-white/70">
                                  {mentor.rating} • {mentor.experience}
                                </span>
                              </div>
                            </div>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-white">
                          <div>
                            <h4 className="font-semibold mb-2 neon-magenta">About</h4>
                            <p className="text-white/70">{mentor.bio}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 neon-violet">Specialties</h4>
                            <div className="flex flex-wrap gap-2">
                              {mentor.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="bg-white/20 text-white">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-4 text-blue-400">Contact Options</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                onClick={() =>
                                  handleConnect("whatsapp", selectedMentor?.whatsapp || "", selectedMentor?.name)
                                }
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                WhatsApp
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full bg-blue-600/20 border-blue-500 text-blue-400 hover:bg-blue-600/30"
                                onClick={() =>
                                  handleConnect("telegram", selectedMentor?.telegram || "", selectedMentor?.name)
                                }
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Telegram
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full bg-red-600/20 border-red-500 text-red-400 hover:bg-red-600/30"
                                onClick={() =>
                                  handleConnect("gmail", selectedMentor?.email || "", selectedMentor?.name)
                                }
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Gmail
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-white/50 mt-4 p-3 bg-white/5 rounded-lg">
                            <p className="font-medium mb-1 text-white/70">Contact Information:</p>
                            <p>📱 WhatsApp: {selectedMentor?.whatsapp}</p>
                            <p>💬 Telegram: {selectedMentor?.telegram}</p>
                            <p>📧 Email: {selectedMentor?.email}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <Card className="futuristic-card">
              <CardContent className="p-12 text-center">
                <div className="text-white/40 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">No mentors found</h3>
                  <p>Try adjusting your search criteria or filters.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
}
