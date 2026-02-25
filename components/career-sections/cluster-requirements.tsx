import { BookMarked } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ClusterRequirementsProps {
  requirements: string
}

export default function ClusterRequirements({
  requirements,
}: ClusterRequirementsProps) {
  return (
    <Card className="futuristic-card border-[#2066c3]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#2066c3]/20">
            <BookMarked className="h-5 w-5 text-[#4a90d9]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Subject Requirements</h2>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {requirements}
        </p>
      </CardContent>
    </Card>
  )
}
