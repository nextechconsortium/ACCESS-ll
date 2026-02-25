import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Consideration } from "@/lib/careers-data"

interface ConsiderationsProps {
  considerations?: Consideration[]
}

export default function Considerations({ considerations = [] }: ConsiderationsProps) {
  return (
    <Card className="futuristic-card border-amber-600/30 bg-amber-950/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-600/20">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Things to Consider</h2>
        </div>

        {considerations.length > 0 ? (
          <div className="space-y-3">
            {considerations.map((consideration, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-amber-600/20 bg-amber-950/30"
              >
                <h3 className="font-semibold text-amber-400 mb-1">
                  {consideration.challenge}
                </h3>
                <p className="text-slate-300 text-sm">{consideration.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No considerations listed</p>
        )}
      </CardContent>
    </Card>
  )
}
