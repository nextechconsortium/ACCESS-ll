"use client"

import { useState } from "react"
import type { Course } from "@/lib/careers-data"
import {
  GraduationCap,
  Building,
  Briefcase,
  ClipboardList,
  ExternalLink,
  X,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import MentorModal from "@/components/mentor-modal"

interface CourseDetailModalProps {
  course: Course
  onClose: () => void
}

export default function CourseDetailModal({
  course,
  onClose,
}: CourseDetailModalProps) {
  const [showMentorModal, setShowMentorModal] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#2066c3]/30 bg-[#1a2942]/95 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#2066c3]/20 bg-[#1a2942]/95 backdrop-blur-xl p-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
            <h2 className="text-xl font-bold text-white leading-tight">
              {course.name}
            </h2>
          </div>
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

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Find a Mentor Button */}
          <div className="rounded-lg border border-[#26a69a]/20 bg-[#26a69a]/5 p-4">
            <Button
              onClick={() => setShowMentorModal(true)}
              className="w-full bg-[#26a69a]/20 hover:bg-[#26a69a]/30 text-[#26a69a] border border-[#26a69a]/30 font-semibold transition-all duration-200 h-11"
            >
              <Users className="h-5 w-5 mr-2" />
              Find a Mentor in This Field
            </Button>
            <p className="text-xs text-[#26a69a]/70 text-center mt-2">
              Connect with industry experts (Premium Service)
            </p>
          </div>

          {/* KCSE Requirements */}
          <div className="rounded-lg border border-[#2066c3]/20 bg-[#2066c3]/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-[#4a90d9]" />
              <h3 className="font-semibold text-[#4a90d9]">
                Minimum KCSE Requirements
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {course.kcseRequirements}
            </p>
          </div>

          {/* Career Paths */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="h-5 w-5 text-[#26a69a]" />
              <h3 className="font-semibold text-[#26a69a]">
                Typical Career Paths
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.careerPaths.map((path) => (
                <Badge
                  key={path}
                  variant="secondary"
                  className="bg-[#26a69a]/10 text-[#26a69a] border border-[#26a69a]/20"
                >
                  {path}
                </Badge>
              ))}
            </div>
          </div>

          {/* Institutions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building className="h-5 w-5 text-[#4a90d9]" />
              <h3 className="font-semibold text-[#4a90d9]">
                Institutions Offering This Course
              </h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.institutions.map((inst) => (
                <li
                  key={inst}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2066c3] shrink-0" />
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* Source Citation */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="h-4 w-4 text-slate-400" />
              <h4 className="text-sm font-medium text-slate-400">
                Source Citation
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {course.sourceCitation}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-[#2066c3]/20 bg-[#1a2942]/95 backdrop-blur-xl p-4 flex justify-end">
          <Button
            onClick={onClose}
            className="neon-button text-white font-semibold"
          >
            Close
          </Button>
        </div>
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
