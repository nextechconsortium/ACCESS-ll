"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  GraduationCap,
  Award,
  FileText,
  Wrench,
  ChevronRight,
  Building,
  Briefcase,
  BookOpen,
  ExternalLink,
  Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClusterCalculator from "@/components/cluster-calculator"
import {
  type Course,
  type ProgrammeLevel,
  allCourses,
  programmeLevels,
  getCategoriesForLevel,
  getCoursesByCategory,
  searchCourses,
  sourceCitations,
} from "@/lib/careers-data"

const levelMeta: Record<
  ProgrammeLevel,
  { icon: typeof GraduationCap; color: string; bgColor: string; borderColor: string; description: string }
> = {
  Degree: {
    icon: GraduationCap,
    color: "text-[#4a90d9]",
    bgColor: "bg-[#2066c3]/15",
    borderColor: "border-[#2066c3]/30",
    description: "4-6 year university programmes. Requires KCSE mean grade of B- and above depending on the course.",
  },
  Diploma: {
    icon: Award,
    color: "text-[#26a69a]",
    bgColor: "bg-[#26a69a]/15",
    borderColor: "border-[#26a69a]/30",
    description: "2-3 year programmes at polytechnics, KMTC, and colleges. Requires KCSE mean grade C and above.",
  },
  Certificate: {
    icon: FileText,
    color: "text-[#4a90d9]",
    bgColor: "bg-[#4a90d9]/15",
    borderColor: "border-[#4a90d9]/30",
    description: "6 months to 1 year programmes at TVET institutions. Requires KCSE mean grade D to C-.",
  },
  Artisan: {
    icon: Wrench,
    color: "text-[#2d9d92]",
    bgColor: "bg-[#2d9d92]/15",
    borderColor: "border-[#2d9d92]/30",
    description: "6 months to 1 year hands-on trade training at Youth Polytechnics and TVET centres. KCPE or KCSE grade D.",
  },
}

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<ProgrammeLevel | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showSources, setShowSources] = useState(false)

  // Compute current results
  const currentCategories = selectedLevel ? getCategoriesForLevel(selectedLevel) : []

  const displayedCourses = useMemo(() => {
    if (searchTerm.trim()) {
      return searchCourses(searchTerm)
    }
    if (selectedLevel && selectedCategory) {
      return getCoursesByCategory(selectedLevel, selectedCategory)
    }
    return []
  }, [searchTerm, selectedLevel, selectedCategory])

  const isSearching = searchTerm.trim().length > 0

  // Stats
  const degreesCount = allCourses.filter((c) => c.programmeLevel === "Degree").length
  const diplomasCount = allCourses.filter((c) => c.programmeLevel === "Diploma").length
  const certsCount = allCourses.filter((c) => c.programmeLevel === "Certificate").length
  const artisanCount = allCourses.filter((c) => c.programmeLevel === "Artisan").length

  const handleLevelSelect = (level: ProgrammeLevel) => {
    setSelectedLevel(level)
    setSelectedCategory(null)
    setSearchTerm("")
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null)
    } else if (selectedLevel) {
      setSelectedLevel(null)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg" />
      <div className="content-wrapper">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Career Programmes in Kenya</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore courses across all programme levels based on official KUCCPS, KMTC, and TVETA classifications.
              Find the right path for your KCSE grade and career goals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="futuristic-card p-4 text-center">
                <div className="text-2xl font-bold text-[#4a90d9]">{degreesCount}</div>
                <div className="text-xs text-slate-400">Degree Courses</div>
              </div>
              <div className="futuristic-card p-4 text-center">
                <div className="text-2xl font-bold text-[#26a69a]">{diplomasCount}</div>
                <div className="text-xs text-slate-400">Diploma Courses</div>
              </div>
              <div className="futuristic-card p-4 text-center">
                <div className="text-2xl font-bold text-[#4a90d9]">{certsCount}</div>
                <div className="text-xs text-slate-400">Certificate Courses</div>
              </div>
              <div className="futuristic-card p-4 text-center">
                <div className="text-2xl font-bold text-[#2d9d92]">{artisanCount}</div>
                <div className="text-xs text-slate-400">Artisan Courses</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search courses, careers, or institutions..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if (e.target.value.trim()) {
                      setSelectedLevel(null)
                      setSelectedCategory(null)
                    }
                  }}
                  className="pl-12 h-12 text-base bg-[#1a2942]/80 border-[#2066c3]/30 text-white placeholder:text-slate-500 focus:border-[#2066c3]/60 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Cluster Points Calculator */}
          <ClusterCalculator />

          {/* Breadcrumb */}
          {(selectedLevel || isSearching) && (
            <div className="flex items-center gap-2 mb-6 text-sm">
              <button
                onClick={() => {
                  setSelectedLevel(null)
                  setSelectedCategory(null)
                  setSearchTerm("")
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                All Programmes
              </button>
              {selectedLevel && (
                <>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`transition-colors ${selectedCategory ? "text-slate-400 hover:text-white" : "text-white font-medium"}`}
                  >
                    {selectedLevel} Programmes
                  </button>
                </>
              )}
              {selectedCategory && (
                <>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                  <span className="text-white font-medium">{selectedCategory}</span>
                </>
              )}
              {isSearching && (
                <>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                  <span className="text-white font-medium">
                    Search results ({displayedCourses.length})
                  </span>
                </>
              )}
            </div>
          )}

          {/* ───── Search Results ───── */}
          {isSearching && (
            <div className="space-y-4">
              {displayedCourses.length === 0 ? (
                <Card className="futuristic-card">
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No courses found
                    </h3>
                    <p className="text-slate-400">
                      Try a different search term or browse by programme level.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                displayedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))
              )}
            </div>
          )}

          {/* ───── Level Selection (Landing) ───── */}
          {!isSearching && !selectedLevel && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programmeLevels.map((level) => {
                  const meta = levelMeta[level]
                  const Icon = meta.icon
                  const count = allCourses.filter(
                    (c) => c.programmeLevel === level
                  ).length
                  return (
                    <button
                      key={level}
                      onClick={() => handleLevelSelect(level)}
                      className={`futuristic-card p-6 text-left transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#2066c3]/50 ${meta.borderColor}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${meta.bgColor}`}
                        >
                          <Icon className={`h-6 w-6 ${meta.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-bold text-white">
                              {level} Programmes
                            </h3>
                            <Badge
                              variant="secondary"
                              className={`${meta.bgColor} ${meta.color} border ${meta.borderColor}`}
                            >
                              {count} courses
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {meta.description}
                          </p>
                          <div className="flex items-center gap-1 mt-3 text-sm font-medium">
                            <span className={meta.color}>Browse courses</span>
                            <ChevronRight className={`h-4 w-4 ${meta.color}`} />
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Source Citations Section */}
              <div className="mt-12">
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
                >
                  <Info className="h-4 w-4" />
                  <span className="font-medium">
                    {showSources ? "Hide" : "View"} Data Sources and Citations
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${showSources ? "rotate-90" : ""}`}
                  />
                </button>
                {showSources && (
                  <Card className="futuristic-card">
                    <CardContent className="p-6">
                      <h3 className="text-base font-semibold text-white mb-4">
                        Official Data Sources
                      </h3>
                      <div className="space-y-3">
                        {sourceCitations.map((source) => (
                          <div
                            key={source.name}
                            className="flex items-start gap-3 text-sm"
                          >
                            <ExternalLink className="h-4 w-4 text-[#4a90d9] shrink-0 mt-0.5" />
                            <div>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#4a90d9] hover:underline font-medium"
                              >
                                {source.name}
                              </a>
                              <p className="text-slate-500 text-xs mt-0.5">
                                {source.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* ───── Category Selection ───── */}
          {!isSearching && selectedLevel && !selectedCategory && (
            <div>
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to all programme levels
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const meta = levelMeta[selectedLevel]
                    const Icon = meta.icon
                    return (
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${meta.bgColor}`}
                      >
                        <Icon className={`h-5 w-5 ${meta.color}`} />
                      </div>
                    )
                  })()}
                  <h2 className="text-2xl font-bold text-white">
                    {selectedLevel} Programmes
                  </h2>
                </div>
                <p className="text-slate-400 text-sm ml-[52px]">
                  {levelMeta[selectedLevel].description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCategories.map((category) => {
                  const count = getCoursesByCategory(
                    selectedLevel,
                    category
                  ).length
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className="futuristic-card p-5 text-left transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#2066c3]/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-white">
                          {category}
                        </h3>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-slate-400 text-xs"
                        >
                          {count}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-[#26a69a]">
                        <span>View courses</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ───── Course Listing ───── */}
          {!isSearching && selectedLevel && selectedCategory && (
            <div>
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to {selectedLevel} categories
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {selectedCategory}
                </h2>
                <p className="text-slate-400 text-sm">
                  {displayedCourses.length} course
                  {displayedCourses.length !== 1 ? "s" : ""} available under{" "}
                  {selectedLevel} Programmes
                </p>
              </div>

              <div className="space-y-4">
                {displayedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* Course Detail Modal */}
    </div>
  )
}

// ──────────────────────────────────────────────
//  Course Card Component
// ──────────────────────────────────────────────

function CourseCard({ course }: { course: Course }) {
  // Build the URL for the career detail page
  const careerUrl = `/careers/${encodeURIComponent(
    course.programmeLevel
  )}/${encodeURIComponent(course.category)}/${course.id}`

  return (
    <Link href={careerUrl}>
      <Card className="futuristic-card hover:scale-[1.01] transition-all cursor-pointer h-full">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-[#2066c3]/20 text-[#4a90d9] border border-[#2066c3]/30 text-xs font-medium">
                {course.programmeLevel}
              </Badge>
              <Badge
                variant="outline"
                className="border-[#26a69a]/30 text-[#26a69a] text-xs font-medium"
              >
                {course.category}
              </Badge>
            </div>
            <h3 className="text-base font-semibold text-white mb-1 leading-tight">
              {course.name}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2 shrink-0 md:text-right">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <GraduationCap className="h-3.5 w-3.5 text-[#4a90d9]" />
              <span className="line-clamp-1">{course.kcseRequirements.split(".")[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Building className="h-3.5 w-3.5 text-[#26a69a]" />
              <span>{course.institutions.length} institution{course.institutions.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Briefcase className="h-3.5 w-3.5 text-[#2d9d92]" />
              <span>{course.careerPaths.length} career path{course.careerPaths.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
