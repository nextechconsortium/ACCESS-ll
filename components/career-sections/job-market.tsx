import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { JobMarketData } from "@/lib/careers-data"

interface JobMarketProps {
  marketData?: JobMarketData
}

export default function JobMarket({ marketData }: JobMarketProps) {
  if (!marketData) {
    return (
      <Card className="futuristic-card border-[#26a69a]/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#26a69a]/20">
              <BarChart3 className="h-5 w-5 text-[#26a69a]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Job Market Trends</h2>
          </div>
          <p className="text-slate-400">No job market data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="futuristic-card border-[#26a69a]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#26a69a]/20">
            <BarChart3 className="h-5 w-5 text-[#26a69a]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Job Market Trends</h2>
        </div>

        <div className="space-y-6">
          {/* Demand Outlook */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-[#26a69a]" />
              <h3 className="font-semibold text-white">Market Demand Outlook</h3>
            </div>
            <p className="text-slate-300 text-sm">
              {marketData.demandOutlook}
            </p>
          </div>

          {/* Trends */}
          <div>
            <h3 className="font-semibold text-white mb-3">Key Trends</h3>
            <div className="space-y-2">
              {marketData.trends.map((trend, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-[#26a69a]/20 bg-[#26a69a]/5"
                >
                  <TrendingUp className="h-4 w-4 text-[#26a69a] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm">{trend}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h3 className="font-semibold text-white mb-3">Market Challenges</h3>
            <div className="space-y-2">
              {marketData.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-amber-600/20 bg-amber-950/30"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
