import { Lightbulb, History, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { FunFact } from "@/lib/careers-data"

interface FunFactsProps {
  facts?: FunFact[]
}

const categoryIcons = {
  surprising: Lightbulb,
  historical: History,
  "kenya-specific": MapPin,
}

const categoryColors = {
  surprising: { bg: "bg-yellow-950/30", border: "border-yellow-600/20", text: "text-yellow-400" },
  historical: { bg: "bg-purple-950/30", border: "border-purple-600/20", text: "text-purple-400" },
  "kenya-specific": { bg: "bg-green-950/30", border: "border-green-600/20", text: "text-green-400" },
}

export default function FunFacts({ facts = [] }: FunFactsProps) {
  return (
    <Card className="futuristic-card border-[#26a69a]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#26a69a]/20">
            <Lightbulb className="h-5 w-5 text-[#26a69a]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Fun Facts</h2>
        </div>

        {facts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {facts.map((funFact, index) => {
              const Icon = categoryIcons[funFact.category]
              const colors = categoryColors[funFact.category]

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-slate-300 text-sm">{funFact.fact}</p>
                      <span className={`inline-block text-xs font-medium mt-2 px-2 py-1 rounded-full ${colors.text} opacity-75`}>
                        {funFact.category.replace("-", " ").charAt(0).toUpperCase() +
                          funFact.category.replace("-", " ").slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-slate-400">No fun facts available</p>
        )}
      </CardContent>
    </Card>
  )
}
