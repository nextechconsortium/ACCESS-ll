"use client"

import { useState, useMemo } from "react"
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Info,
  Sparkles,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  type KCSEGrade,
  type CourseCutoff,
  allGrades,
  clusterSubjects,
  gradeToPoints,
  matchCoursesForStudent,
} from "@/lib/careers-data"

type SubjectGrades = Record<string, KCSEGrade | "">

const subjectGroups = [
  { key: "compulsory" as const, label: "Compulsory Subjects" },
  { key: "sciences" as const, label: "Science Options" },
  { key: "humanities" as const, label: "Humanities Options" },
  { key: "technical" as const, label: "Technical Options" },
]

function GradeSelect({
  value,
  onChange,
  label,
}: {
  value: KCSEGrade | ""
  onChange: (g: KCSEGrade | "") => void
  label: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <label className="text-sm text-slate-300 font-medium min-w-0 truncate">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as KCSEGrade | "")}
        className="w-24 shrink-0 rounded-lg border border-[#2066c3]/30 bg-[#0f1a2b]/80 px-3 py-2 text-sm text-white focus:border-[#2066c3]/60 focus:outline-none focus:ring-1 focus:ring-[#2066c3]/40 transition-colors appearance-none cursor-pointer"
        aria-label={`Grade for ${label}`}
      >
        <option value="">--</option>
        {allGrades.map((g) => (
          <option key={g} value={g}>
            {g} ({gradeToPoints[g]} pts)
          </option>
        ))}
      </select>
    </div>
  )
}

function ResultCard({
  entry,
  status,
}: {
  entry: CourseCutoff & { studentPoints: number }
  status: "qualified" | "borderline" | "stretch"
}) {
  const statusConfig = {
    qualified: {
      icon: CheckCircle2,
      label: "Qualified",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/15",
      borderColor: "border-emerald-500/30",
    },
    borderline: {
      icon: AlertTriangle,
      label: "Borderline",
      color: "text-amber-400",
      bgColor: "bg-amber-500/15",
      borderColor: "border-amber-500/30",
    },
    stretch: {
      icon: XCircle,
      label: "Stretch",
      color: "text-orange-400",
      bgColor: "bg-orange-500/15",
      borderColor: "border-orange-500/30",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-4 transition-all hover:scale-[1.01]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className="border-white/20 text-slate-400 text-xs"
            >
              {entry.programmeLevel}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/15 text-slate-500 text-xs"
            >
              {entry.category}
            </Badge>
          </div>
          <h4 className="text-sm font-semibold text-white leading-tight">
            {entry.courseName}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Your cluster: {entry.studentPoints}/48 | Cutoff range: {entry.cutoffLow}
            {" - "}{entry.cutoffHigh}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span className={`text-xs font-semibold ${config.color}`}>
            {config.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ClusterCalculator() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [grades, setGrades] = useState<SubjectGrades>(() => {
    const initial: SubjectGrades = {}
    clusterSubjects.forEach((s) => (initial[s.id] = ""))
    return initial
  })

  const filledCount = useMemo(
    () => Object.values(grades).filter((g) => g !== "").length,
    [grades]
  )

  const totalPoints = useMemo(() => {
    const filled = Object.entries(grades)
      .filter(([, g]) => g !== "")
      .map(([, g]) => gradeToPoints[g as KCSEGrade])
      .sort((a, b) => b - a)
      .slice(0, 4)
    return filled.reduce((sum, p) => sum + p, 0)
  }, [grades])

  const results = useMemo(() => {
    if (filledCount < 4) return null
    const subjectGrades = Object.entries(grades)
      .filter(([, g]) => g !== "")
      .map(([subjectId, grade]) => ({
        subjectId,
        grade: grade as KCSEGrade,
      }))
    return matchCoursesForStudent(subjectGrades)
  }, [grades, filledCount])

  const totalMatches = results
    ? results.highlyCompetitive.length +
      results.moderateChance.length +
      results.stretchOptions.length
    : 0

  const handleReset = () => {
    const reset: SubjectGrades = {}
    clusterSubjects.forEach((s) => (reset[s.id] = ""))
    setGrades(reset)
    setStep(1)
  }

  const handleGradeChange = (subjectId: string, grade: KCSEGrade | "") => {
    setGrades((prev) => ({ ...prev, [subjectId]: grade }))
  }

  return (
    <div className="mb-8">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 rounded-xl border border-[#2066c3]/30 bg-[#1a2942]/90 backdrop-blur-sm px-5 py-4 transition-all hover:border-[#2066c3]/50 hover:bg-[#1a2942] focus:outline-none focus:ring-2 focus:ring-[#2066c3]/40"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2066c3]/15">
            <Calculator className="h-5 w-5 text-[#4a90d9]" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white">
              Check Your Eligibility
            </h3>
            <p className="text-xs text-slate-400">
              KUCCPS Cluster Points Calculator & Career Matcher
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filledCount >= 4 && totalMatches > 0 && (
            <Badge className="bg-[#26a69a]/20 text-[#26a69a] border border-[#26a69a]/30 text-xs">
              {totalMatches} match{totalMatches !== 1 ? "es" : ""}
            </Badge>
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Calculator Panel */}
      {isOpen && (
        <div className="mt-3 rounded-xl border border-[#2066c3]/20 bg-[#1a2942]/80 backdrop-blur-sm overflow-hidden animate-in slide-in-from-top-2 duration-300">
          {/* Disclaimer */}
          <div className="flex items-start gap-3 border-b border-[#2066c3]/15 bg-[#2066c3]/5 px-5 py-3">
            <Info className="h-4 w-4 text-[#4a90d9] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              This calculator provides an <strong className="text-slate-300">estimated</strong> cluster point score based on KUCCPS methodology. It is not an official KUCCPS result but is usually very close to actual placement calculations. Cutoff points vary yearly depending on demand and capacity.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 px-5 py-3 border-b border-[#2066c3]/10">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === 1 ? "text-[#4a90d9]" : "text-slate-500 hover:text-slate-300"}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step === 1 ? "bg-[#2066c3]/30 text-[#4a90d9]" : filledCount >= 4 ? "bg-[#26a69a]/20 text-[#26a69a]" : "bg-white/10 text-slate-500"}`}
              >
                {filledCount >= 4 && step === 2 ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  "1"
                )}
              </span>
              Enter Grades
            </button>
            <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
            <button
              onClick={() => {
                if (filledCount >= 4) setStep(2)
              }}
              disabled={filledCount < 4}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === 2 ? "text-[#4a90d9]" : filledCount >= 4 ? "text-slate-400 hover:text-slate-300" : "text-slate-600 cursor-not-allowed"}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step === 2 ? "bg-[#2066c3]/30 text-[#4a90d9]" : "bg-white/10 text-slate-500"}`}
              >
                2
              </span>
              View Results
            </button>
          </div>

          {/* Step 1: Grade Entry */}
          {step === 1 && (
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjectGroups.map((group) => {
                  const subjects = clusterSubjects.filter(
                    (s) => s.group === group.key
                  )
                  return (
                    <div key={group.key}>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {group.label}
                      </h4>
                      <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-1 divide-y divide-white/5">
                        {subjects.map((subject) => (
                          <GradeSelect
                            key={subject.id}
                            label={subject.name}
                            value={grades[subject.id]}
                            onChange={(g) => handleGradeChange(subject.id, g)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Points Preview & Action */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-[#2066c3]/20 bg-[#2066c3]/5 p-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    Subjects entered: {filledCount} / 13 (minimum 4 required)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {totalPoints}
                    </span>
                    <span className="text-sm text-slate-400">/48 estimated cluster points</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    disabled={filledCount < 4}
                    onClick={() => setStep(2)}
                    className="neon-button text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
                  >
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    Find Matches
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Results */}
          {step === 2 && results && (
            <div className="p-5">
              {/* Summary */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 rounded-lg border border-[#26a69a]/20 bg-[#26a69a]/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#26a69a]/15">
                    <GraduationCap className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      Your estimated cluster points
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {totalPoints}
                      <span className="text-sm font-normal text-slate-400">
                        {" "}/ 48
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    Edit Grades
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Start Over
                  </Button>
                </div>
              </div>

              {totalMatches === 0 ? (
                <Card className="futuristic-card">
                  <CardContent className="p-10 text-center">
                    <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-amber-400/60" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No matching courses found
                    </h3>
                    <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      Try entering more subject grades or consider Certificate and Artisan programmes which have lower entry requirements.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Highly Competitive */}
                  {results.highlyCompetitive.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <h4 className="text-sm font-bold text-emerald-400">
                          Highly Competitive ({results.highlyCompetitive.length})
                        </h4>
                        <span className="text-xs text-slate-500">
                          Above recent cutoffs
                        </span>
                      </div>
                      <div className="space-y-2">
                        {results.highlyCompetitive.map((entry) => (
                          <ResultCard
                            key={entry.courseId}
                            entry={entry}
                            status="qualified"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Moderate Chance */}
                  {results.moderateChance.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <h4 className="text-sm font-bold text-amber-400">
                          Moderate Chance ({results.moderateChance.length})
                        </h4>
                        <span className="text-xs text-slate-500">
                          Around cutoff range
                        </span>
                      </div>
                      <div className="space-y-2">
                        {results.moderateChance.map((entry) => (
                          <ResultCard
                            key={entry.courseId}
                            entry={entry}
                            status="borderline"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stretch Options */}
                  {results.stretchOptions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="h-4 w-4 text-orange-400" />
                        <h4 className="text-sm font-bold text-orange-400">
                          Stretch Options ({results.stretchOptions.length})
                        </h4>
                        <span className="text-xs text-slate-500">
                          Below typical cutoff but within range
                        </span>
                      </div>
                      <div className="space-y-2">
                        {results.stretchOptions.map((entry) => (
                          <ResultCard
                            key={entry.courseId}
                            entry={entry}
                            status="stretch"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Note */}
              <div className="mt-6 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <Info className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Cutoff points are based on historical KUCCPS placement trends (2022-2024) and vary yearly depending on demand, capacity, and national performance. Always verify with the official KUCCPS portal at{" "}
                  <a
                    href="https://kuccps.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4a90d9] hover:underline"
                  >
                    kuccps.net
                  </a>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
