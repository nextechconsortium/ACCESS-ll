import { Briefcase, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { CareerPathway } from "@/lib/careers-data"

interface CareerPathwaysProps {
  pathways?: CareerPathway[]
}

export default function CareerPathways({ pathways = [] }: CareerPathwaysProps) {
  return (
    <Card className="futuristic-card border-[#4a90d9]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#4a90d9]/20">
            <Briefcase className="h-5 w-5 text-[#4a90d9]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Career Pathways</h2>
        </div>

        {pathways.length > 0 ? (
          <div className="space-y-3">
            {pathways.map((pathway, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-[#4a90d9]/20 bg-[#4a90d9]/5 hover:bg-[#4a90d9]/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-[#4a90d9] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{pathway.title}</h3>
                    <p className="text-slate-300 text-sm">{pathway.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No career pathways listed</p>
        )}
      </CardContent>
    </Card>
  )
}
