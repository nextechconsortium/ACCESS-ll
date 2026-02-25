import { DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SalaryInsights } from "@/lib/careers-data"

interface SalaryInsightsProps {
  salaryData?: SalaryInsights
}

export default function SalaryInsights({ salaryData }: SalaryInsightsProps) {
  if (!salaryData) {
    return (
      <Card className="futuristic-card border-[#4a90d9]/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#4a90d9]/20">
              <DollarSign className="h-5 w-5 text-[#4a90d9]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Salary Insights</h2>
          </div>
          <p className="text-slate-400">No salary data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="futuristic-card border-[#4a90d9]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#4a90d9]/20">
            <DollarSign className="h-5 w-5 text-[#4a90d9]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Salary Insights (Kenya)</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Entry Level */}
          <div className="p-4 rounded-lg border border-[#4a90d9]/20 bg-[#4a90d9]/5">
            <Badge className="mb-2 bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Entry Level
            </Badge>
            <p className="text-2xl font-bold text-[#4a90d9] mb-1">
              {salaryData.entryLevel}
            </p>
            <p className="text-slate-400 text-xs">0-2 years experience</p>
          </div>

          {/* Mid Career */}
          <div className="p-4 rounded-lg border border-[#26a69a]/20 bg-[#26a69a]/5">
            <Badge className="mb-2 bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Mid Career
            </Badge>
            <p className="text-2xl font-bold text-[#26a69a] mb-1">
              {salaryData.midCareer}
            </p>
            <p className="text-slate-400 text-xs">3-10 years experience</p>
          </div>

          {/* Senior Level */}
          <div className="p-4 rounded-lg border border-amber-600/20 bg-amber-950/30">
            <Badge className="mb-2 bg-amber-600/20 text-amber-300 border border-amber-600/30">
              Senior Level
            </Badge>
            <p className="text-2xl font-bold text-amber-400 mb-1">
              {salaryData.seniorLevel}
            </p>
            <p className="text-slate-400 text-xs">10+ years experience</p>
          </div>
        </div>

        <p className="text-slate-400 text-xs mt-4">
          💡 Salary estimates based on Kenya job market data. Actual salaries may vary by employer, location, and individual qualifications.
        </p>
      </CardContent>
    </Card>
  )
}
