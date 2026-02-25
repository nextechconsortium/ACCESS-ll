import { GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AcademicStructureProps {
  content: string
}

export default function AcademicStructure({ content }: AcademicStructureProps) {
  return (
    <Card className="futuristic-card border-[#2066c3]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#2066c3]/20">
            <GraduationCap className="h-5 w-5 text-[#4a90d9]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Academic Structure</h2>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  )
}
