"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MentorModal from "@/components/mentor-modal"
import AboutCareer from "@/components/career-sections/about-career"
import AcademicStructure from "@/components/career-sections/academic-structure"
import SkillsDisplay from "@/components/career-sections/skills-display"
import CareerPathways from "@/components/career-sections/career-pathways"
import Considerations from "@/components/career-sections/considerations"
import InstitutionsSection from "@/components/career-sections/institutions-section"
import ClusterRequirements from "@/components/career-sections/cluster-requirements"
import CutoffHistory from "@/components/career-sections/cutoff-history"
import JobMarket from "@/components/career-sections/job-market"
import SalaryInsights from "@/components/career-sections/salary-insights"
import FunFacts from "@/components/career-sections/fun-facts"
import { allCourses, type ProgrammeLevel } from "@/lib/careers-data"

export default function CareerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showMentorModal, setShowMentorModal] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    // Check if we can go back in history (navigation came from careers page)
    setCanGoBack(window.history.length > 1)
  }, [])

  // Decode URL parameters
  const decodedLevel = decodeURIComponent(params.level as string) as ProgrammeLevel
  const decodedCategory = decodeURIComponent(params.category as string)
  const courseId = params.courseId as string

  // Find the course
  const course = allCourses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="min-h-screen">
        <div className="futuristic-bg" />
        <div className="content-wrapper">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Course Not Found</h1>
              <p className="text-slate-300 mb-6">
                We couldn't find the career programme you're looking for.
              </p>
              <Link href="/careers">
                <Button className="neon-button">Back to Careers</Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="futuristic-bg" />
      <div className="content-wrapper">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            {/* Breadcrumb */}
            <button
              onClick={() => {
                if (canGoBack) {
                  router.back()
                } else {
                  router.push("/careers")
                }
              }}
              className="inline-flex items-center gap-2 text-[#4a90d9] hover:text-[#6aa3e5] transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </button>

            {/* Title & Badges */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-[#2066c3]/20 text-[#4a90d9] border border-[#2066c3]/30 font-medium">
                  {course.programmeLevel}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-[#26a69a]/30 text-[#26a69a] font-medium"
                >
                  {course.category}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.name}
              </h1>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="futuristic-card p-4">
              <div className="text-2xl font-bold text-[#4a90d9]">
                {course.careerPaths?.length || 0}
              </div>
              <div className="text-xs text-slate-400">Career Paths</div>
            </div>
            <div className="futuristic-card p-4">
              <div className="text-2xl font-bold text-[#26a69a]">
                {course.institutions?.length || 0}
              </div>
              <div className="text-xs text-slate-400">Institutions</div>
            </div>
            <div className="futuristic-card p-4">
              <div className="text-2xl font-bold text-amber-500">
                {course.technicalSkills?.length || 0}
              </div>
              <div className="text-xs text-slate-400">Skills</div>
            </div>
            <div className="futuristic-card p-4">
              <Button
                onClick={() => setShowMentorModal(true)}
                className="w-full h-10 bg-[#26a69a]/20 hover:bg-[#26a69a]/30 text-[#26a69a] border border-[#26a69a]/30 font-semibold text-xs"
              >
                <Users className="h-4 w-4 mr-1" />
                Find Mentor
              </Button>
            </div>
          </div>

          {/* Main Content - Sections */}
          <div className="space-y-8 mb-12">
            {/* 1. About Career */}
            {course.aboutCareer && (
              <AboutCareer
                content={course.aboutCareer}
                careerName={course.name}
              />
            )}

            {/* 2. Academic Structure */}
            {course.academicStructure && (
              <AcademicStructure content={course.academicStructure} />
            )}

            {/* 3. Skills Gained */}
            {(course.technicalSkills || course.softSkills) && (
              <SkillsDisplay
                technicalSkills={course.technicalSkills}
                softSkills={course.softSkills}
              />
            )}

            {/* 4. Career Pathways */}
            {course.careerPathways && course.careerPathways.length > 0 && (
              <CareerPathways pathways={course.careerPathways} />
            )}

            {/* 5. Things to Consider */}
            {course.thingsToConsider && course.thingsToConsider.length > 0 && (
              <Considerations considerations={course.thingsToConsider} />
            )}

            {/* 6. Institutions */}
            {course.detailedInstitutions && course.detailedInstitutions.length > 0 && (
              <InstitutionsSection institutions={course.detailedInstitutions} />
            )}

            {/* 7. Cluster Requirements */}
            {course.clusterRequirements && (
              <ClusterRequirements requirements={course.clusterRequirements} />
            )}

            {/* 8. Cutoff History */}
            {course.cutoffHistory && course.cutoffHistory.length > 0 && (
              <CutoffHistory history={course.cutoffHistory} />
            )}

            {/* 9. Job Market Trends */}
            {course.jobMarketTrends && (
              <JobMarket marketData={course.jobMarketTrends} />
            )}

            {/* 10. Salary Insights */}
            {course.salaryInsights && (
              <SalaryInsights salaryData={course.salaryInsights} />
            )}

            {/* 11. Fun Facts */}
            {course.funFacts && course.funFacts.length > 0 && (
              <FunFacts facts={course.funFacts} />
            )}
          </div>

          {/* Floating CTA */}
          <div className="sticky bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#0f1118] via-[#0f1118] to-transparent border-t border-[#2066c3]/20">
            <div className="container mx-auto px-4 flex gap-4">
              <Button
                onClick={() => setShowMentorModal(true)}
                className="flex-1 bg-[#26a69a] hover:bg-[#26a69a]/90 text-white font-semibold"
              >
                <Users className="h-5 w-5 mr-2" />
                Find a Mentor in This Field
              </Button>
              <Button
                onClick={() => {
                  if (canGoBack) {
                    router.back()
                  } else {
                    router.push("/careers")
                  }
                }}
                variant="outline"
                className="flex-1 border-[#2066c3]/30 text-[#4a90d9] hover:bg-[#2066c3]/10"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Mentor Modal */}
      {showMentorModal && (
        <MentorModal
          courseName={course.name}
          courseCategory={course.category}
          onClose={() => setShowMentorModal(false)}
        />
      )}
    </div>
  )
}
