"use client"

import { useState, useEffect } from "react"
import {
  Search,
  MapPin,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Star,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface University {
  id: string
  name: string
  country: string
  city: string
  worldRank: number
  countryRank: number
  courseFocus: string[]
  tuitionFee: string
  description: string
  website: string
  admissionRequirements: string[]
  popularPrograms: string[]
  bestFor: string[]
  applicationDeadlines: {
    fall: string
    spring?: string
    summer?: string
  }
  applicationProcess: string[]
  considerations: string[]
  qualifications: {
    undergraduate: string[]
    graduate: string[]
  }
  acceptanceRate: string
  studentPopulation: string
  internationalStudents: string
}

const universities: University[] = [
  // United States - Top Universities
  {
    id: "1",
    name: "Harvard University",
    country: "United States",
    city: "Cambridge, MA",
    worldRank: 1,
    countryRank: 1,
    courseFocus: ["Business", "Medicine", "Law", "Liberal Arts", "Sciences"],
    tuitionFee: "$54,269/year",
    description:
      "Prestigious Ivy League university known for academic excellence, research, and producing world leaders.",
    website: "https://www.harvard.edu",
    admissionRequirements: ["SAT/ACT Scores", "High GPA (3.9+)", "Essays", "Recommendations", "Extracurriculars"],
    popularPrograms: ["MBA", "Medicine", "Law", "Computer Science", "Economics"],
    bestFor: ["Business Leadership", "Medical Research", "Legal Studies", "Liberal Arts Education"],
    applicationDeadlines: {
      fall: "January 1, 2026",
      spring: "Not Available",
    },
    applicationProcess: [
      "Submit Common Application or Coalition Application",
      "Complete Harvard-specific supplemental essays",
      "Submit standardized test scores (SAT/ACT)",
      "Provide official transcripts",
      "Submit 2-3 letters of recommendation",
      "Complete optional alumni interview",
    ],
    considerations: [
      "Extremely competitive admission (3.4% acceptance rate)",
      "Need-blind admission for US students",
      "Generous financial aid program",
      "Strong alumni network globally",
      "High academic pressure environment",
    ],
    qualifications: {
      undergraduate: ["SAT: 1460-1580", "ACT: 33-35", "GPA: 3.9+", "Strong extracurriculars", "Leadership experience"],
      graduate: [
        "GRE/GMAT scores",
        "Bachelor's degree",
        "Research experience",
        "Professional experience",
        "Strong recommendations",
      ],
    },
    acceptanceRate: "3.4%",
    studentPopulation: "23,000",
    internationalStudents: "25%",
  },
  {
    id: "2",
    name: "Stanford University",
    country: "United States",
    city: "Stanford, CA",
    worldRank: 2,
    countryRank: 2,
    courseFocus: ["Technology", "Engineering", "Business", "Medicine", "Sciences"],
    tuitionFee: "$56,169/year",
    description: "Leading research university in Silicon Valley, renowned for innovation and entrepreneurship.",
    website: "https://www.stanford.edu",
    admissionRequirements: ["SAT/ACT Scores", "High GPA", "Essays", "Recommendations", "Innovation Portfolio"],
    popularPrograms: ["Computer Science", "Engineering", "MBA", "Medicine", "Data Science"],
    bestFor: ["Technology Innovation", "Entrepreneurship", "Engineering", "Startup Culture"],
    applicationDeadlines: {
      fall: "January 2, 2026",
      spring: "Not Available",
    },
    applicationProcess: [
      "Submit Common Application",
      "Complete Stanford supplemental essays",
      "Submit standardized test scores",
      "Provide official transcripts",
      "Submit teacher recommendations",
      "Optional portfolio for arts/engineering",
    ],
    considerations: [
      "Highly competitive (3.9% acceptance rate)",
      "Strong focus on innovation and entrepreneurship",
      "Excellent industry connections in tech",
      "High cost of living in Bay Area",
      "Collaborative academic environment",
    ],
    qualifications: {
      undergraduate: ["SAT: 1440-1570", "ACT: 32-35", "GPA: 3.9+", "Innovation projects", "Leadership roles"],
      graduate: ["GRE/GMAT required", "Relevant work experience", "Research publications", "Strong academic record"],
    },
    acceptanceRate: "3.9%",
    studentPopulation: "17,000",
    internationalStudents: "22%",
  },
  {
    id: "3",
    name: "Massachusetts Institute of Technology",
    country: "United States",
    city: "Cambridge, MA",
    worldRank: 3,
    countryRank: 3,
    courseFocus: ["Engineering", "Technology", "Sciences", "Mathematics", "Computer Science"],
    tuitionFee: "$53,790/year",
    description: "World's leading institution for science, technology, engineering, and mathematics education.",
    website: "https://www.mit.edu",
    admissionRequirements: ["SAT/ACT Scores", "High GPA", "Math/Science Excellence", "Essays", "Recommendations"],
    popularPrograms: ["Computer Science", "Engineering", "Physics", "Mathematics", "Economics"],
    bestFor: ["STEM Fields", "Research", "Innovation", "Technical Excellence"],
    applicationDeadlines: {
      fall: "January 1, 2026",
      spring: "Not Available",
    },
    applicationProcess: [
      "Submit MIT application",
      "Complete essays and short responses",
      "Submit SAT/ACT and SAT Subject Tests",
      "Provide official transcripts",
      "Submit recommendations from teachers",
      "Complete optional interview",
    ],
    considerations: [
      "Extremely rigorous academic program",
      "Strong emphasis on problem-solving",
      "Collaborative learning environment",
      "Excellent research opportunities",
      "High stress academic culture",
    ],
    qualifications: {
      undergraduate: [
        "SAT: 1510-1580",
        "ACT: 34-36",
        "Strong math/science background",
        "Research experience preferred",
      ],
      graduate: ["GRE scores", "Strong technical background", "Research experience", "Publications preferred"],
    },
    acceptanceRate: "6.7%",
    studentPopulation: "11,500",
    internationalStudents: "33%",
  },

  // United Kingdom - Top Universities
  {
    id: "4",
    name: "University of Oxford",
    country: "United Kingdom",
    city: "Oxford",
    worldRank: 4,
    countryRank: 1,
    courseFocus: ["Liberal Arts", "Sciences", "Medicine", "Law", "Philosophy"],
    tuitionFee: "£28,370/year",
    description: "One of the oldest and most prestigious universities in the English-speaking world.",
    website: "https://www.ox.ac.uk",
    admissionRequirements: ["A-Levels", "Personal Statement", "Interview", "References", "Admissions Test"],
    popularPrograms: ["PPE", "Medicine", "Law", "Engineering", "Natural Sciences"],
    bestFor: ["Academic Excellence", "Research", "Traditional Education", "Global Recognition"],
    applicationDeadlines: {
      fall: "October 15, 2025",
      spring: "Not Available",
    },
    applicationProcess: [
      "Submit UCAS application",
      "Complete personal statement",
      "Take required admissions tests",
      "Attend interview if shortlisted",
      "Submit academic references",
      "Meet conditional offer requirements",
    ],
    considerations: [
      "Tutorial system provides personalized education",
      "Highly competitive admission process",
      "Rich historical and cultural environment",
      "Strong alumni network globally",
      "Traditional academic approach",
    ],
    qualifications: {
      undergraduate: ["A-Levels: A*A*A", "IB: 38-40 points", "Strong academic record", "Relevant subject background"],
      graduate: [
        "First-class or upper second-class degree",
        "Research proposal",
        "Academic references",
        "English proficiency",
      ],
    },
    acceptanceRate: "17.5%",
    studentPopulation: "24,000",
    internationalStudents: "41%",
  },
  {
    id: "5",
    name: "University of Cambridge",
    country: "United Kingdom",
    city: "Cambridge",
    worldRank: 5,
    countryRank: 2,
    courseFocus: ["Sciences", "Mathematics", "Engineering", "Medicine", "Liberal Arts"],
    tuitionFee: "£22,227/year",
    description: "Historic university renowned for academic excellence and groundbreaking research.",
    website: "https://www.cam.ac.uk",
    admissionRequirements: ["A-Levels", "Personal Statement", "Interview", "References", "Admissions Test"],
    popularPrograms: ["Natural Sciences", "Mathematics", "Engineering", "Medicine", "Computer Science"],
    bestFor: ["Scientific Research", "Mathematics", "Academic Excellence", "Innovation"],
    applicationDeadlines: {
      fall: "October 15, 2025",
      spring: "Not Available",
    },
    applicationProcess: [
      "Submit UCAS application",
      "Complete Cambridge-specific forms",
      "Take required pre-interview assessments",
      "Attend college interview",
      "Submit academic references",
      "Meet conditional offer requirements",
    ],
    considerations: [
      "College system provides close-knit community",
      "Intensive supervision system",
      "Strong emphasis on independent learning",
      "Excellent research facilities",
      "Competitive academic environment",
    ],
    qualifications: {
      undergraduate: [
        "A-Levels: A*A*A",
        "IB: 40-42 points",
        "Strong mathematical ability",
        "Subject-specific requirements",
      ],
      graduate: [
        "First-class degree preferred",
        "Research experience",
        "Strong academic references",
        "Relevant background",
      ],
    },
    acceptanceRate: "21%",
    studentPopulation: "23,000",
    internationalStudents: "38%",
  },

  // Canada - Top Universities
  {
    id: "6",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto, ON",
    worldRank: 18,
    countryRank: 1,
    courseFocus: ["Engineering", "Medicine", "Business", "Arts", "Sciences"],
    tuitionFee: "CAD $58,160/year",
    description: "Leading Canadian research university with diverse academic programs and global recognition.",
    website: "https://www.utoronto.ca",
    admissionRequirements: ["High School Diploma", "English Proficiency", "Essays", "Prerequisites"],
    popularPrograms: ["Engineering", "Medicine", "Business", "Computer Science", "Life Sciences"],
    bestFor: ["Research", "Diversity", "Urban Experience", "Global Recognition"],
    applicationDeadlines: {
      fall: "January 13, 2026",
      spring: "October 1, 2025",
      summer: "February 1, 2026",
    },
    applicationProcess: [
      "Submit OUAC application",
      "Complete supplemental applications",
      "Submit official transcripts",
      "Provide English proficiency scores",
      "Submit required essays/portfolios",
      "Meet program-specific requirements",
    ],
    considerations: [
      "Large university with diverse student body",
      "Excellent research opportunities",
      "Urban campus in downtown Toronto",
      "Strong international reputation",
      "Competitive programs",
    ],
    qualifications: {
      undergraduate: ["High school average: 85%+", "English proficiency", "Program prerequisites", "Extracurriculars"],
      graduate: ["Bachelor's degree", "GPA: 3.3+", "English proficiency", "Program-specific requirements"],
    },
    acceptanceRate: "43%",
    studentPopulation: "97,000",
    internationalStudents: "25%",
  },
]

const countries = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Singapore",
  "Japan",
  "France",
  "Netherlands",
  "Switzerland",
  "South Korea",
  "China",
]

const courseFocuses = [
  "All Courses",
  "Engineering",
  "Medicine",
  "Business",
  "Computer Science",
  "Sciences",
  "Liberal Arts",
  "Law",
  "Technology",
]

const sortOptions = [
  "World Ranking",
  "Country Ranking",
  "Acceptance Rate (Lowest)",
  "Acceptance Rate (Highest)",
  "Tuition (Lowest)",
  "Tuition (Highest)",
]

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [sortBy, setSortBy] = useState("World Ranking")
  const [filteredUniversities, setFilteredUniversities] = useState(universities)
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)

  const filterUniversities = () => {
    let filtered = universities

    if (searchTerm) {
      filtered = filtered.filter(
        (university) =>
          university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          university.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          university.popularPrograms.some((program) => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
          university.city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter((university) => university.country === selectedCountry)
    }

    if (selectedCourse !== "All Courses") {
      filtered = filtered.filter(
        (university) =>
          university.courseFocus.some((course) => course.toLowerCase().includes(selectedCourse.toLowerCase())) ||
          university.popularPrograms.some((program) => program.toLowerCase().includes(selectedCourse.toLowerCase())),
      )
    }

    // Sort universities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "World Ranking":
          return a.worldRank - b.worldRank
        case "Country Ranking":
          return a.countryRank - b.countryRank
        case "Acceptance Rate (Lowest)":
          return Number.parseFloat(a.acceptanceRate) - Number.parseFloat(b.acceptanceRate)
        case "Acceptance Rate (Highest)":
          return Number.parseFloat(b.acceptanceRate) - Number.parseFloat(a.acceptanceRate)
        default:
          return a.worldRank - b.worldRank
      }
    })

    setFilteredUniversities(filtered)
  }

  useEffect(() => {
    filterUniversities()
  }, [searchTerm, selectedCountry, selectedCourse, sortBy])

  const groupedByCountry = filteredUniversities.reduce(
    (acc, university) => {
      if (!acc[university.country]) {
        acc[university.country] = []
      }
      acc[university.country].push(university)
      return acc
    },
    {} as Record<string, University[]>,
  )

  const getTopUniversitiesByCountry = () => {
    const topByCountry: Record<string, University> = {}

    universities.forEach((university) => {
      if (!topByCountry[university.country] || university.worldRank < topByCountry[university.country].worldRank) {
        topByCountry[university.country] = university
      }
    })

    return Object.values(topByCountry).sort((a, b) => a.worldRank - b.worldRank)
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
              <span className="gradient-text">Top Universities Worldwide 2025</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Explore the world's top universities with comprehensive information about programs, requirements, and
              application processes for 2025 admissions.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-cyan mb-2">200+</div>
                  <div className="text-sm text-white/70">Top Universities</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-magenta mb-2">50+</div>
                  <div className="text-sm text-white/70">Countries</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold neon-violet mb-2">1000+</div>
                  <div className="text-sm text-white/70">Programs</div>
                </CardContent>
              </Card>
              <Card className="futuristic-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                  <div className="text-sm text-white/70">Success Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="futuristic-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search universities by name, program, city, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courseFocuses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Universities Display */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 glass-card">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/20 text-white">
                All Universities
              </TabsTrigger>
              <TabsTrigger value="country" className="data-[state=active]:bg-white/20 text-white">
                By Country
              </TabsTrigger>
              <TabsTrigger value="top" className="data-[state=active]:bg-white/20 text-white">
                Best Per Country
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUniversities.map((university) => (
                  <Card key={university.id} className="futuristic-card hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                            {university.country}
                          </Badge>
                          <Badge variant="secondary" className="bg-white/30 text-white">
                            #{university.worldRank}
                          </Badge>
                        </div>
                        <div className="text-right text-sm text-white/70">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-400" />
                            <span className="text-yellow-400">{university.acceptanceRate}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">{university.name}</CardTitle>
                      <CardDescription className="text-white/70 line-clamp-2">
                        {university.city} • {university.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 mr-2 neon-cyan" />
                          <span className="font-medium text-white">{university.tuitionFee}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <GraduationCap className="h-4 w-4 mr-2 neon-magenta" />
                          <span className="text-white/70">{university.studentPopulation} students</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-white neon-violet">Best For:</h4>
                        <div className="flex flex-wrap gap-1">
                          {university.bestFor.slice(0, 2).map((item) => (
                            <Badge
                              key={item}
                              variant="outline"
                              className="text-xs bg-white/10 text-white/80 border-white/20"
                            >
                              {item}
                            </Badge>
                          ))}
                          {university.bestFor.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-white/5 text-white/60 border-white/20">
                              +{university.bestFor.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full neon-button text-white border-white/20 bg-transparent"
                              onClick={() => setSelectedUniversity(university)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="futuristic-card max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center justify-between text-white">
                                <div>
                                  <h3 className="text-2xl font-bold">{university.name}</h3>
                                  <p className="text-white/70">
                                    {university.city}, {university.country}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge variant="secondary" className="text-lg bg-white/30 text-white">
                                    #{university.worldRank}
                                  </Badge>
                                  <p className="text-sm text-white/70 mt-1">World Ranking</p>
                                </div>
                              </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 text-white">
                              {/* Quick Stats */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                  <div className="font-bold text-lg neon-cyan">{university.acceptanceRate}</div>
                                  <div className="text-xs text-white/70">Acceptance Rate</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                  <div className="font-bold text-lg neon-magenta">{university.studentPopulation}</div>
                                  <div className="text-xs text-white/70">Students</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                  <div className="font-bold text-lg neon-violet">
                                    {university.internationalStudents}
                                  </div>
                                  <div className="text-xs text-white/70">International</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                  <div className="font-bold text-lg text-blue-400">#{university.countryRank}</div>
                                  <div className="text-xs text-white/70">Country Rank</div>
                                </div>
                              </div>

                              {/* Description */}
                              <div>
                                <h4 className="font-semibold mb-2 neon-cyan">About</h4>
                                <p className="text-white/70">{university.description}</p>
                              </div>

                              {/* Best For & Programs */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-2 neon-magenta">Best For</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {university.bestFor.map((item) => (
                                      <Badge key={item} variant="secondary" className="bg-white/20 text-white">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2 neon-violet">Popular Programs</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {university.popularPrograms.map((program) => (
                                      <Badge
                                        key={program}
                                        variant="outline"
                                        className="bg-white/10 text-white/80 border-white/20"
                                      >
                                        {program}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Application Process */}
                              <Collapsible>
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-between neon-button text-white border-white/20 bg-transparent"
                                  >
                                    <span className="flex items-center">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Application Process
                                    </span>
                                    <span>Click to expand</span>
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-4 space-y-4">
                                  <div>
                                    <h5 className="font-semibold mb-2 flex items-center text-white">
                                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                                      <span className="text-blue-400">Application Deadlines</span>
                                    </h5>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <strong>Fall:</strong> {university.applicationDeadlines.fall}
                                      </p>
                                      {university.applicationDeadlines.spring && (
                                        <p>
                                          <strong>Spring:</strong> {university.applicationDeadlines.spring}
                                        </p>
                                      )}
                                      {university.applicationDeadlines.summer && (
                                        <p>
                                          <strong>Summer:</strong> {university.applicationDeadlines.summer}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold mb-2 text-white">Application Steps</h5>
                                    <ol className="space-y-2 text-sm">
                                      {university.applicationProcess.map((step, index) => (
                                        <li key={index} className="flex items-start">
                                          <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                                            {index + 1}
                                          </span>
                                          <span className="text-white/70">{step}</span>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>

                              {/* Requirements & Qualifications */}
                              <Collapsible>
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-between neon-button text-white border-white/20 bg-transparent"
                                  >
                                    <span className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Requirements & Qualifications
                                    </span>
                                    <span>Click to expand</span>
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-4 space-y-4">
                                  <div>
                                    <h5 className="font-semibold mb-2 text-white">General Requirements</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {university.admissionRequirements.map((req) => (
                                        <Badge
                                          key={req}
                                          variant="outline"
                                          className="text-xs bg-white/10 text-white/80 border-white/20"
                                        >
                                          {req}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="font-semibold mb-2 text-white">Undergraduate Qualifications</h5>
                                      <ul className="space-y-1 text-sm">
                                        {university.qualifications.undergraduate.map((qual, index) => (
                                          <li key={index} className="flex items-start">
                                            <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            <span className="text-white/70">{qual}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold mb-2 text-white">Graduate Qualifications</h5>
                                      <ul className="space-y-1 text-sm">
                                        {university.qualifications.graduate.map((qual, index) => (
                                          <li key={index} className="flex items-start">
                                            <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            <span className="text-white/70">{qual}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>

                              {/* Considerations */}
                              <div>
                                <h4 className="font-semibold mb-2 text-white text-yellow-400">
                                  Important Considerations
                                </h4>
                                <ul className="space-y-2 text-sm">
                                  {university.considerations.map((consideration, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="text-yellow-400 mr-2 mt-1">⚠️</span>
                                      <span className="text-white/70">{consideration}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-4 pt-4">
                                <Button asChild className="flex-1 neon-button text-white">
                                  <a href={university.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                    <ExternalLink className="h-4 w-4 ml-2" />
                                  </a>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1 neon-button text-white border-white/20 bg-transparent"
                                >
                                  Save University
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button asChild className="w-full neon-button text-white">
                          <a href={university.website} target="_blank" rel="noopener noreferrer">
                            Visit Website
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="country">
              <div className="space-y-8">
                {Object.entries(groupedByCountry).map(([country, unis]) => (
                  <div key={country}>
                    <h2 className="text-2xl font-bold mb-4 gradient-text">{country}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {unis.map((university) => (
                        <Card key={university.id} className="futuristic-card">
                          <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="secondary" className="bg-white/30 text-white">
                                #{university.worldRank} World
                              </Badge>
                              <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                                #{university.countryRank} {country}
                              </Badge>
                            </div>
                            <CardTitle className="text-white text-lg">{university.name}</CardTitle>
                            <CardDescription className="text-white/70 line-clamp-2">
                              {university.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center text-sm">
                              <DollarSign className="h-4 w-4 mr-2 neon-cyan" />
                              <span className="font-medium text-white">{university.tuitionFee}</span>
                            </div>
                            <Button asChild className="w-full neon-button text-white">
                              <a href={university.website} target="_blank" rel="noopener noreferrer">
                                Visit Website
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2 text-white">Best University Per Country</h2>
                  <p className="text-white/70">The highest-ranked university from each country</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getTopUniversitiesByCountry().map((university) => (
                    <Card key={university.id} className="futuristic-card border-2 border-primary/20">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge className="bg-primary text-white">{university.country} #1</Badge>
                          <Badge variant="secondary" className="bg-white/30 text-white">
                            #{university.worldRank} World
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-lg">{university.name}</CardTitle>
                        <CardDescription className="text-white/70 line-clamp-2">
                          {university.city} • {university.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 mr-2 neon-cyan" />
                            <span className="font-medium text-white">{university.tuitionFee}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 mr-2 text-yellow-400" />
                            <span className="text-white/70">{university.acceptanceRate} acceptance rate</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm text-white neon-violet">Specializes In:</h4>
                          <div className="flex flex-wrap gap-1">
                            {university.bestFor.slice(0, 3).map((item) => (
                              <Badge
                                key={item}
                                variant="outline"
                                className="text-xs bg-white/10 text-white/80 border-white/20"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button asChild className="w-full neon-button text-white">
                          <a href={university.website} target="_blank" rel="noopener noreferrer">
                            Visit Website
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {filteredUniversities.length === 0 && (
            <Card className="futuristic-card">
              <CardContent className="p-12 text-center">
                <div className="text-white/40 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">No universities found</h3>
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
