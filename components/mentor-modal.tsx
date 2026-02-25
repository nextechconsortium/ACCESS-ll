"use client"

import { useState } from "react"
import {
  X,
  Users,
  Crown,
  MessageCircle,
  Mail,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Briefcase,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  type Mentor,
  getMentorsForCourse,
  accessContact,
} from "@/lib/mentors-data"

interface MentorModalProps {
  courseName: string
  courseCategory: string
  onClose: () => void
}

export default function MentorModal({
  courseName,
  courseCategory,
  onClose,
}: MentorModalProps) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [showContactFlow, setShowContactFlow] = useState(false)

  const relevantMentors = getMentorsForCourse(courseCategory)

  const handleWhatsApp = (mentorName: string) => {
    const message = `Hello ACCESS team, I would like to connect with a mentor.\nCareer Interest: ${courseName}\nSelected Mentor: ${mentorName}\nPlease guide me on the next steps.`
    const url = `https://wa.me/${accessContact.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const handleEmail = (mentorName: string) => {
    const subject = encodeURIComponent(
      `Mentorship Request – ${courseName}`
    )
    const body = encodeURIComponent(
      `Hello ACCESS Team,\n\nI would like to request mentorship support.\n\nCareer of Interest: ${courseName}\nSelected Mentor: ${mentorName}\n\nKindly guide me on the payment process and next steps.\n\nThank you.`
    )
    const url = `mailto:${accessContact.email}?subject=${subject}&body=${body}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#2066c3]/30 bg-[#1a2942]/95 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-[#2066c3]/20 bg-[#1a2942]/95 backdrop-blur-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {selectedMentor && !showContactFlow ? (
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-2"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to mentors
                </button>
              ) : showContactFlow ? (
                <button
                  onClick={() => setShowContactFlow(false)}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-2"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to mentor profile
                </button>
              ) : null}
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-5 w-5 text-[#26a69a]" />
                <h2 className="text-lg font-bold text-white">
                  {showContactFlow
                    ? "Request Connection"
                    : selectedMentor
                      ? selectedMentor.name
                      : "Mentors in This Field"}
                </h2>
              </div>
              {!selectedMentor && !showContactFlow && (
                <p className="text-sm text-slate-400">
                  {courseName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-white hover:bg-white/10 shrink-0"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* ── Contact Flow ── */}
          {showContactFlow && selectedMentor && (
            <div className="space-y-5">
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-300 text-sm mb-1">
                      Premium Mentorship Service
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Mentorship connections are a premium ACCESS service. To
                      proceed, contact us via WhatsApp or Email. Our team will
                      guide you through the payment process and connect you
                      with your selected mentor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#2066c3]/20 bg-[#2066c3]/5 p-4">
                <h4 className="text-sm font-medium text-slate-300 mb-1">
                  Your request details
                </h4>
                <div className="space-y-1 text-sm text-slate-400">
                  <p>
                    <span className="text-slate-500">Career:</span>{" "}
                    <span className="text-white">{courseName}</span>
                  </p>
                  <p>
                    <span className="text-slate-500">Mentor:</span>{" "}
                    <span className="text-white">
                      {selectedMentor.name}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={() => handleWhatsApp(selectedMentor.name)}
                  className="bg-[#25D366]/90 hover:bg-[#25D366] text-white font-semibold h-12"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact via WhatsApp
                </Button>
                <Button
                  onClick={() => handleEmail(selectedMentor.name)}
                  variant="outline"
                  className="border-[#4a90d9]/40 text-[#4a90d9] hover:bg-[#4a90d9]/10 bg-transparent h-12 font-semibold"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact via Email
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center leading-relaxed">
                A pre-filled message will be sent on your behalf. The ACCESS
                team will respond within 24 hours.
              </p>
            </div>
          )}

          {/* ── Mentor Detail View ── */}
          {selectedMentor && !showContactFlow && (
            <div className="space-y-5">
              <div>
                <p className="text-[#26a69a] font-medium text-sm mb-1">
                  {selectedMentor.title}
                </p>
                <Badge
                  variant="outline"
                  className="border-[#2066c3]/30 text-[#4a90d9] text-xs"
                >
                  {selectedMentor.industry}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#4a90d9]" />
                  About
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedMentor.bio}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[#26a69a]" />
                  Areas of Guidance
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.guidanceAreas.map((area) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className="bg-[#26a69a]/10 text-[#26a69a] border border-[#26a69a]/20 text-xs"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setShowContactFlow(true)}
                className="w-full neon-button text-white font-semibold h-11"
              >
                <Crown className="h-4 w-4 mr-2" />
                Request Connection
              </Button>

              <p className="text-xs text-center text-slate-500">
                Paid guidance service. ACCESS will facilitate the
                introduction.
              </p>
            </div>
          )}

          {/* ── Mentor List ── */}
          {!selectedMentor && !showContactFlow && (
            <div className="space-y-3">
              {relevantMentors.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-10 w-10 mx-auto text-slate-600 mb-3" />
                  <h3 className="text-white font-semibold mb-1">
                    No mentors listed yet
                  </h3>
                  <p className="text-slate-400 text-sm">
                    We are currently onboarding mentors for this field.
                    Check back soon.
                  </p>
                </div>
              ) : (
                relevantMentors.map((mentor) => (
                  <Card
                    key={mentor.id}
                    className="border border-[#2066c3]/20 bg-[#2066c3]/5 hover:bg-[#2066c3]/10 transition-colors cursor-pointer"
                    onClick={() => setSelectedMentor(mentor)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setSelectedMentor(mentor)
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm">
                            {mentor.name}
                          </h3>
                          <p className="text-[#26a69a] text-xs font-medium mt-0.5">
                            {mentor.title}
                          </p>
                          <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                            {mentor.bio}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {mentor.guidanceAreas.slice(0, 3).map((area) => (
                              <Badge
                                key={area}
                                variant="outline"
                                className="border-white/10 text-slate-400 text-[10px] px-1.5 py-0"
                              >
                                {area}
                              </Badge>
                            ))}
                            {mentor.guidanceAreas.length > 3 && (
                              <Badge
                                variant="outline"
                                className="border-white/10 text-slate-500 text-[10px] px-1.5 py-0"
                              >
                                +{mentor.guidanceAreas.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              {relevantMentors.length > 0 && (
                <div className="rounded-lg border border-amber-500/15 bg-amber-500/5 p-3 mt-2">
                  <p className="text-xs text-amber-300/80 text-center leading-relaxed">
                    <Crown className="h-3 w-3 inline mr-1" />
                    Mentorship is a premium paid service. Select a mentor to
                    learn more and request a connection through ACCESS.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
