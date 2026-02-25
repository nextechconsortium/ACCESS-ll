import { Zap, Brain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillsDisplayProps {
  technicalSkills?: string[]
  softSkills?: string[]
}

export default function SkillsDisplay({
  technicalSkills = [],
  softSkills = [],
}: SkillsDisplayProps) {
  return (
    <Card className="futuristic-card border-[#26a69a]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#26a69a]/20">
            <Zap className="h-5 w-5 text-[#26a69a]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Skills You'll Develop</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-[#4a90d9]" />
              <h3 className="font-semibold text-white">Technical Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.length > 0 ? (
                technicalSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#2066c3]/20 text-[#4a90d9] border border-[#2066c3]/30"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No technical skills listed</p>
              )}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-[#26a69a]" />
              <h3 className="font-semibold text-white">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.length > 0 ? (
                softSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#26a69a]/20 text-[#26a69a] border border-[#26a69a]/30"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No soft skills listed</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
