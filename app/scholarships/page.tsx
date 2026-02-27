"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Calendar, MapPin, DollarSign, Users, Clock, ExternalLink, Flag, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  deadline: string
  location: string
  level: string
  category: string
  description: string
  requirements: string[]
  benefits: string[]
  applicationProcess: string[]
  contactInfo: string
  website: string
  isKenyan: boolean
  priority: "high" | "medium" | "low"
  daysRemaining: number
  status: "open" | "closing-soon" | "closed"
}

const scholarships: Scholarship[] = [
  // Kenyan Government Scholarships
  {
    id: "helb-2025",
    name: "HELB Scholarship 2025",
    provider: "Higher Education Loans Board",
    amount: "KES 35,000-60,000/semester",
    deadline: "May 31, 2025",
    location: "Kenya",
    level: "Undergraduate/Postgraduate",
    category: "Government",
    description: "Government scholarship for Kenyan students pursuing higher education in recognized institutions.",
    requirements: [
      "Kenyan citizenship",
      "KCSE certificate",
      "University admission letter",
      "Financial need assessment",
    ],
    benefits: ["Tuition fee support", "Upkeep allowance", "Book allowance", "Special needs support"],
    applicationProcess: [
      "Register on HELB portal",
      "Complete online application",
      "Upload required documents",
      "Submit application",
    ],
    contactInfo: "info@helb.co.ke | +254-20-2224350",
    website: "https://www.helb.co.ke",
    isKenyan: true,
    priority: "high",
    daysRemaining: 132,
    status: "open",
  },
  {
    id: "kuccps-2025",
    name: "KUCCPS Scholarship 2025",
    provider: "Kenya Universities and Colleges Central Placement Service",
    amount: "Full tuition coverage",
    deadline: "April 15, 2025",
    location: "Kenya",
    level: "Undergraduate",
    category: "Government",
    description: "Merit-based scholarship for top KCSE performers joining public universities.",
    requirements: [
      "KCSE grade A- and above",
      "Kenyan citizenship",
      "First-time university student",
      "KUCCPS placement",
    ],
    benefits: ["Full tuition waiver", "Accommodation support", "Meal allowance", "Academic materials"],
    applicationProcess: [
      "Automatic consideration for top performers",
      "Accept KUCCPS placement",
      "Report to assigned university",
    ],
    contactInfo: "info@kuccps.net | +254-20-2033620",
    website: "https://www.kuccps.net",
    isKenyan: true,
    priority: "high",
    daysRemaining: 86,
    status: "open",
  },
  {
    id: "ngcdf-2025",
    name: "NG-CDF Bursary 2025",
    provider: "National Government Constituencies Development Fund",
    amount: "KES 10,000-50,000/year",
    deadline: "June 30, 2025",
    location: "Kenya",
    level: "Secondary/Tertiary",
    category: "Government",
    description: "Constituency-based bursary for needy students from all constituencies in Kenya.",
    requirements: ["Kenyan citizenship", "Resident of specific constituency", "Financial need", "Academic merit"],
    benefits: ["School fees support", "Examination fees", "Learning materials", "Transport allowance"],
    applicationProcess: [
      "Apply through local CDF office",
      "Submit financial need assessment",
      "Provide academic records",
    ],
    contactInfo: "Contact your local CDF office",
    website: "https://www.ngcdf.go.ke",
    isKenyan: true,
    priority: "medium",
    daysRemaining: 162,
    status: "open",
  },
  {
    id: "unesco-kenya-2025",
    name: "UNESCO Kenya Scholarship 2025",
    provider: "UNESCO Kenya",
    amount: "Varies by program",
    deadline: "August 15, 2025",
    location: "Kenya/International",
    level: "Undergraduate/Postgraduate",
    category: "International Organization",
    description: "Educational scholarships in science, technology, and sustainable development fields.",
    requirements: ["Academic excellence", "Field relevance", "Development impact potential", "English proficiency"],
    benefits: ["Tuition support", "Research funding", "Mentorship", "Network access"],
    applicationProcess: ["Online application", "Submit research proposal", "Academic references", "Interview process"],
    contactInfo: "nairobi@unesco.org | +254-20-7621234",
    website: "https://en.unesco.org/fieldoffice/nairobi",
    isKenyan: true,
    priority: "medium",
    daysRemaining: 208,
    status: "open",
  },

  // Private Foundation Scholarships
  {
    id: "equity-wings-2025",
    name: "Equity Wings to Fly 2025",
    provider: "Equity Group Foundation",
    amount: "Full secondary education",
    deadline: "March 31, 2025",
    location: "Kenya",
    level: "Secondary",
    category: "Private Foundation",
    description: "Comprehensive scholarship program for bright but needy students completing primary education.",
    requirements: ["KCPE score 300+", "Financial need", "Kenyan citizenship", "Good character"],
    benefits: ["Full school fees", "Boarding expenses", "Learning materials", "Mentorship program"],
    applicationProcess: ["Online application", "Submit KCPE results", "Financial assessment", "Interview"],
    contactInfo: "wingstofly@equitybank.co.ke | +254-763-026000",
    website: "https://equitygroupfoundation.com/wings-to-fly",
    isKenyan: true,
    priority: "high",
    daysRemaining: 71,
    status: "open",
  },
  {
    id: "kcb-foundation-2025",
    name: "KCB Foundation Scholarship 2025",
    provider: "KCB Foundation",
    amount: "KES 150,000/year",
    deadline: "April 30, 2025",
    location: "Kenya",
    level: "Undergraduate",
    category: "Private Foundation",
    description: "Supporting academically gifted students from disadvantaged backgrounds.",
    requirements: ["University admission", "Financial need", "Academic excellence", "Leadership potential"],
    benefits: ["Tuition support", "Upkeep allowance", "Mentorship", "Internship opportunities"],
    applicationProcess: ["Online application", "Submit academic records", "Financial documentation", "Interview"],
    contactInfo: "foundation@kcbgroup.com | +254-711-087000",
    website: "https://www.kcbgroup.com/foundation",
    isKenyan: true,
    priority: "high",
    daysRemaining: 101,
    status: "open",
  },
  {
    id: "safaricom-foundation-2025",
    name: "Safaricom Foundation Scholarship 2025",
    provider: "Safaricom Foundation",
    amount: "Full tuition + KES 40,000 upkeep",
    deadline: "May 15, 2025",
    location: "Kenya",
    level: "Undergraduate",
    category: "Private Foundation",
    description: "Comprehensive scholarship for students pursuing STEM and business courses.",
    requirements: ["KCSE grade B+ and above", "STEM/Business course", "Financial need", "Kenyan citizenship"],
    benefits: ["Full tuition", "Accommodation", "Upkeep allowance", "Laptop provision", "Internship guarantee"],
    applicationProcess: ["Online application", "Academic verification", "Financial assessment", "Panel interview"],
    contactInfo: "foundation@safaricom.co.ke | +254-722-000000",
    website: "https://www.safaricom.co.ke/foundation",
    isKenyan: true,
    priority: "high",
    daysRemaining: 116,
    status: "open",
  },
  {
    id: "coop-bank-foundation-2025",
    name: "Co-operative Bank Foundation 2025",
    provider: "Co-operative Bank Foundation",
    amount: "KES 100,000-200,000/year",
    deadline: "June 15, 2025",
    location: "Kenya",
    level: "Undergraduate/Postgraduate",
    category: "Private Foundation",
    description: "Educational support for students from cooperative movement families and communities.",
    requirements: ["Connection to cooperative movement", "Academic merit", "Financial need", "Community involvement"],
    benefits: ["Tuition support", "Research funding", "Mentorship", "Career guidance"],
    applicationProcess: ["Application through cooperatives", "Academic documentation", "Community endorsement"],
    contactInfo: "foundation@co-opbank.co.ke | +254-711-049000",
    website: "https://www.co-opbank.co.ke/foundation",
    isKenyan: true,
    priority: "medium",
    daysRemaining: 147,
    status: "open",
  },
  {
    id: "chandaria-foundation-2025",
    name: "Chandaria Foundation Scholarship 2025",
    provider: "Chandaria Foundation",
    amount: "Varies up to full coverage",
    deadline: "July 31, 2025",
    location: "Kenya",
    level: "All levels",
    category: "Private Foundation",
    description: "Supporting education across all levels with focus on character development.",
    requirements: ["Academic excellence", "Good character", "Financial need", "Community service"],
    benefits: ["Tuition support", "Character development programs", "Leadership training", "Alumni network"],
    applicationProcess: ["Written application", "Character references", "Academic records", "Interview"],
    contactInfo: "info@chandariafoundation.org | +254-20-2713999",
    website: "https://www.chandariafoundation.org",
    isKenyan: true,
    priority: "medium",
    daysRemaining: 193,
    status: "open",
  },
  {
    id: "kam-scholarship-2025",
    name: "KAM Scholarship 2025",
    provider: "Kenya Association of Manufacturers",
    amount: "KES 80,000-150,000/year",
    deadline: "May 30, 2025",
    location: "Kenya",
    level: "Undergraduate/Postgraduate",
    category: "Industry Association",
    description: "Supporting students in manufacturing-related fields and technical courses.",
    requirements: [
      "Engineering/Technical course",
      "Academic excellence",
      "Interest in manufacturing",
      "Kenyan citizenship",
    ],
    benefits: ["Tuition support", "Industrial attachment", "Mentorship", "Job placement assistance"],
    applicationProcess: ["Online application", "Course verification", "Academic transcripts", "Technical interview"],
    contactInfo: "info@kam.co.ke | +254-20-2324817",
    website: "https://www.kam.co.ke",
    isKenyan: true,
    priority: "medium",
    daysRemaining: 131,
    status: "open",
  },

  // International Scholarships for Kenyans
  {
    id: "mastercard-foundation-2025",
    name: "Mastercard Foundation Scholars 2025",
    provider: "Mastercard Foundation",
    amount: "Full funding worldwide",
    deadline: "March 15, 2025",
    location: "Global",
    level: "Undergraduate/Postgraduate",
    category: "International Foundation",
    description: "Comprehensive scholarship for academically talented yet economically disadvantaged young people.",
    requirements: ["Academic excellence", "Financial need", "Leadership potential", "Commitment to giving back"],
    benefits: ["Full tuition", "Living expenses", "Travel costs", "Leadership development", "Alumni network"],
    applicationProcess: [
      "Partner university application",
      "Scholarship application",
      "Leadership assessment",
      "Interview",
    ],
    contactInfo: "scholars@mastercardfdn.org",
    website: "https://mastercardfdn.org/scholars/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 55,
    status: "closing-soon",
  },
  {
    id: "daad-germany-2025",
    name: "DAAD Germany Scholarship 2025",
    provider: "German Academic Exchange Service",
    amount: "€850-1,200/month",
    deadline: "July 31, 2025",
    location: "Germany",
    level: "Postgraduate/PhD",
    category: "Government",
    description: "Study and research scholarships for international students in Germany.",
    requirements: ["Bachelor's degree", "German/English proficiency", "Research proposal", "Academic excellence"],
    benefits: ["Monthly stipend", "Health insurance", "Travel allowance", "Research support"],
    applicationProcess: ["Online application", "University admission", "Language certification", "Research proposal"],
    contactInfo: "info@daad.de | +49-228-882-0",
    website: "https://www.daad.de/en/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 193,
    status: "open",
  },
  {
    id: "commonwealth-2025",
    name: "Commonwealth Scholarships 2025",
    provider: "Commonwealth Scholarship Commission",
    amount: "Full UK funding",
    deadline: "December 1, 2025",
    location: "United Kingdom",
    level: "Postgraduate/PhD",
    category: "Government",
    description: "Scholarships for citizens of Commonwealth countries to study in the UK.",
    requirements: ["Commonwealth citizenship", "First-class degree", "Development impact", "English proficiency"],
    benefits: ["Full tuition", "Living allowance", "Travel costs", "Thesis grant"],
    applicationProcess: ["Online application", "Academic references", "Development impact statement", "Interview"],
    contactInfo: "info@cscuk.org.uk | +44-20-7389-4572",
    website: "https://cscuk.fcdo.gov.uk/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 316,
    status: "open",
  },
  {
    id: "chevening-2025",
    name: "Chevening UK Scholarship 2025",
    provider: "UK Government",
    amount: "Full masters funding",
    deadline: "November 2, 2025",
    location: "United Kingdom",
    level: "Postgraduate",
    category: "Government",
    description: "UK government's global scholarship programme for future leaders.",
    requirements: ["Bachelor's degree", "2 years work experience", "Leadership potential", "English proficiency"],
    benefits: ["Full tuition", "Living allowance", "Travel costs", "Visa fees", "Networking events"],
    applicationProcess: ["Online application", "University applications", "References", "Interview"],
    contactInfo: "chevening@fcdo.gov.uk",
    website: "https://www.chevening.org/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 287,
    status: "open",
  },
  {
    id: "australia-awards-2025",
    name: "Australia Awards 2025",
    provider: "Australian Government",
    amount: "Full funding",
    deadline: "April 30, 2025",
    location: "Australia",
    level: "Undergraduate/Postgraduate",
    category: "Government",
    description: "Long-term development scholarships to study in Australia.",
    requirements: ["Academic merit", "Development relevance", "English proficiency", "Return commitment"],
    benefits: ["Full tuition", "Living allowance", "Health insurance", "Travel costs"],
    applicationProcess: ["Online application", "Academic transcripts", "English test", "Interview"],
    contactInfo: "info@australiaawards.gov.au",
    website: "https://www.australiaawards.gov.au/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 101,
    status: "open",
  },
  {
    id: "chinese-government-2025",
    name: "Chinese Government Scholarship 2025",
    provider: "China Scholarship Council",
    amount: "Full funding + stipend",
    deadline: "April 15, 2025",
    location: "China",
    level: "All levels",
    category: "Government",
    description: "Comprehensive scholarship for international students to study in China.",
    requirements: ["Academic excellence", "Good health", "Age requirements", "Language proficiency"],
    benefits: ["Full tuition", "Monthly stipend", "Accommodation", "Medical insurance"],
    applicationProcess: ["Online application", "University admission", "Medical examination", "Document verification"],
    contactInfo: "webmaster@csc.edu.cn",
    website: "https://www.csc.edu.cn/",
    isKenyan: false,
    priority: "medium",
    daysRemaining: 86,
    status: "open",
  },
  {
    id: "japan-mext-2025",
    name: "Japan MEXT Scholarship 2025",
    provider: "Ministry of Education, Culture, Sports, Science and Technology",
    amount: "¥143,000-145,000/month",
    deadline: "June 15, 2025",
    location: "Japan",
    level: "Undergraduate/Postgraduate",
    category: "Government",
    description: "Japanese government scholarship for international students.",
    requirements: ["Academic excellence", "Japanese language proficiency", "Good health", "Age limits"],
    benefits: ["Monthly allowance", "Tuition waiver", "Travel expenses", "Japanese language training"],
    applicationProcess: ["Embassy application", "Written examination", "Interview", "Health check"],
    contactInfo: "Contact Japanese Embassy in Kenya",
    website: "https://www.mext.go.jp/en/",
    isKenyan: false,
    priority: "medium",
    daysRemaining: 147,
    status: "open",
  },
  {
    id: "fulbright-2025",
    name: "Fulbright USA Scholarship 2025",
    provider: "US Department of State",
    amount: "Full graduate funding",
    deadline: "May 15, 2025",
    location: "United States",
    level: "Postgraduate",
    category: "Government",
    description: "Premier international educational exchange program.",
    requirements: ["Bachelor's degree", "English proficiency", "Leadership potential", "Return commitment"],
    benefits: ["Full tuition", "Living stipend", "Health insurance", "Travel costs", "Professional development"],
    applicationProcess: ["Online application", "Academic transcripts", "English test", "Interview"],
    contactInfo: "Contact US Embassy in Kenya",
    website: "https://foreign.fulbrightonline.org/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 116,
    status: "open",
  },
  {
    id: "rhodes-2025",
    name: "Rhodes Scholarship 2025",
    provider: "Rhodes Trust",
    amount: "Full Oxford funding",
    deadline: "October 1, 2025",
    location: "United Kingdom (Oxford)",
    level: "Postgraduate",
    category: "Private Foundation",
    description: "The world's oldest international scholarship programme.",
    requirements: ["Academic excellence", "Leadership", "Service commitment", "Character"],
    benefits: ["Full Oxford fees", "Living stipend", "Travel expenses", "Personal development"],
    applicationProcess: ["Online application", "Academic references", "Personal statement", "Interview"],
    contactInfo: "rhodes@rhodeshouse.ox.ac.uk",
    website: "https://www.rhodeshouse.ox.ac.uk/",
    isKenyan: false,
    priority: "high",
    daysRemaining: 255,
    status: "open",
  },
  {
    id: "aga-khan-2025",
    name: "Aga Khan Foundation Scholarship 2025",
    provider: "Aga Khan Foundation",
    amount: "50% grant, 50% loan",
    deadline: "March 31, 2025",
    location: "Global",
    level: "Postgraduate",
    category: "Private Foundation",
    description: "Educational scholarships for students from developing countries.",
    requirements: ["Academic excellence", "Financial need", "Development commitment", "Admission to top university"],
    benefits: ["Partial grant", "Interest-free loan", "Career guidance", "Alumni network"],
    applicationProcess: ["Online application", "Financial documentation", "Academic records", "Interview"],
    contactInfo: "scholarships@akdn.org",
    website: "https://www.akdn.org/our-agencies/aga-khan-foundation",
    isKenyan: false,
    priority: "medium",
    daysRemaining: 71,
    status: "open",
  },
]

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredScholarships = useMemo(() => {
    let filtered = scholarships

    // Tab filtering
    if (activeTab === "kenyan") {
      filtered = filtered.filter((s) => s.isKenyan)
    } else if (activeTab === "international") {
      filtered = filtered.filter((s) => !s.isKenyan)
    }

    // Search filtering
    if (searchTerm) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filtering
    if (categoryFilter !== "all") {
      filtered = filtered.filter((scholarship) => scholarship.category === categoryFilter)
    }

    // Level filtering
    if (levelFilter !== "all") {
      filtered = filtered.filter((scholarship) => scholarship.level.toLowerCase().includes(levelFilter.toLowerCase()))
    }

    // Location filtering
    if (locationFilter !== "all") {
      filtered = filtered.filter((scholarship) => scholarship.location === locationFilter)
    }

    // Sort by priority and deadline
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return a.daysRemaining - b.daysRemaining
    })
  }, [searchTerm, categoryFilter, levelFilter, locationFilter, activeTab])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "closing-soon":
        return "bg-yellow-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10"
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "low":
        return "border-green-500/30 bg-green-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  const kenyanCount = scholarships.filter((s) => s.isKenyan).length
  const internationalCount = scholarships.filter((s) => !s.isKenyan).length
  const openCount = scholarships.filter((s) => s.status === "open").length

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg"></div>
      <div className="content-wrapper">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Scholarship Opportunities 2025</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Discover comprehensive funding opportunities for Kenyan students. From local government support to
              international scholarships - your educational journey starts here.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-cyan mb-2">{scholarships.length}</div>
                  <div className="text-sm text-white/70">Total Scholarships</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-magenta mb-2">{kenyanCount}</div>
                  <div className="text-sm text-white/70">Kenyan Scholarships</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-violet mb-2">{internationalCount}</div>
                  <div className="text-sm text-white/70">International</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{openCount}</div>
                  <div className="text-sm text-white/70">Currently Open</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="futuristic-card mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Private Foundation">Private Foundation</SelectItem>
                    <SelectItem value="International Foundation">International Foundation</SelectItem>
                    <SelectItem value="Industry Association">Industry Association</SelectItem>
                    <SelectItem value="International Organization">International Organization</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="Global">Global</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                    setLevelFilter("all")
                    setLocationFilter("all")
                  }}
                  variant="outline"
                  className="neon-button text-white border-white/20"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/20 text-white">
                All Scholarships ({scholarships.length})
              </TabsTrigger>
              <TabsTrigger value="kenyan" className="data-[state=active]:bg-white/20 text-white">
                🇰🇪 Kenyan ({kenyanCount})
              </TabsTrigger>
              <TabsTrigger value="international" className="data-[state=active]:bg-white/20 text-white">
                🌍 International ({internationalCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((scholarship) => (
                  <Card
                    key={scholarship.id}
                    className={`futuristic-card transition-shadow duration-300 hover:shadow-2xl ${getPriorityColor(scholarship.priority)}`}

                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {scholarship.isKenyan && <Flag className="h-4 w-4 text-green-500" />}
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(scholarship.status)} text-white border-0`}
                          >
                            {scholarship.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {scholarship.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{scholarship.name}</CardTitle>
                      <CardDescription className="text-white/70">{scholarship.provider}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <DollarSign className="h-4 w-4 neon-cyan" />
                          <span className="font-semibold">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Calendar className="h-4 w-4 neon-magenta" />
                          <span>Deadline: {scholarship.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Clock className="h-4 w-4 neon-violet" />
                          <span className={scholarship.daysRemaining <= 30 ? "text-red-400 font-semibold" : ""}>
                            {scholarship.daysRemaining} days remaining
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <MapPin className="h-4 w-4 text-blue-400" />
                          <span>{scholarship.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>{scholarship.level}</span>
                        </div>

                        {scholarship.daysRemaining <= 30 && (
                          <div className="flex items-center gap-2 p-2 bg-red-500/20 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-red-400 text-xs font-semibold">CLOSING SOON!</span>
                          </div>
                        )}

                        <p className="text-white/70 text-sm line-clamp-3">{scholarship.description}</p>

                        <div className="flex gap-2 pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="neon-button flex-1 text-white">View Details</Button>
                            </DialogTrigger>
                            <DialogContent className="futuristic-card max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-white text-xl flex items-center gap-2">
                                  {scholarship.isKenyan && <Flag className="h-5 w-5 text-green-500" />}
                                  {scholarship.name}
                                </DialogTitle>
                                <DialogDescription className="text-white/70">
                                  {scholarship.provider} • {scholarship.category}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 text-white">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold neon-cyan mb-2">Amount</h4>
                                    <p className="text-white/70">{scholarship.amount}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold neon-magenta mb-2">Deadline</h4>
                                    <p className="text-white/70">{scholarship.deadline}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold neon-violet mb-2">Location</h4>
                                    <p className="text-white/70">{scholarship.location}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-blue-400 mb-2">Level</h4>
                                    <p className="text-white/70">{scholarship.level}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold neon-cyan mb-2">Description</h4>
                                  <p className="text-white/70">{scholarship.description}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold neon-magenta mb-2">Requirements</h4>
                                  <ul className="list-disc list-inside text-white/70 space-y-1">
                                    {scholarship.requirements.map((req, index) => (
                                      <li key={index}>{req}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold neon-violet mb-2">Benefits</h4>
                                  <ul className="list-disc list-inside text-white/70 space-y-1">
                                    {scholarship.benefits.map((benefit, index) => (
                                      <li key={index}>{benefit}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-blue-400 mb-2">Application Process</h4>
                                  <ol className="list-decimal list-inside text-white/70 space-y-1">
                                    {scholarship.applicationProcess.map((step, index) => (
                                      <li key={index}>{step}</li>
                                    ))}
                                  </ol>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-purple-400 mb-2">Contact Information</h4>
                                  <p className="text-white/70">{scholarship.contactInfo}</p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                  <Button
                                    className="neon-button flex-1 text-white"
                                    onClick={() => window.open(scholarship.website, "_blank")}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Visit Official Website
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredScholarships.length === 0 && (
                <Card className="futuristic-card">
                  <CardContent className="p-12 text-center">
                    <div className="text-white/40 mb-4">
                      <Search className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-white">No scholarships found</h3>
                      <p>Try adjusting your search criteria or filters.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </div>
  )
}
