import { TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CutoffHistoryEntry } from "@/lib/careers-data"

interface CutoffHistoryProps {
  history?: CutoffHistoryEntry[]
}

export default function CutoffHistory({ history = [] }: CutoffHistoryProps) {
  return (
    <Card className="futuristic-card border-[#4a90d9]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#4a90d9]/20">
            <TrendingUp className="h-5 w-5 text-[#4a90d9]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Historical Cut-off Points</h2>
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#2066c3]/20 hover:bg-transparent">
                  <TableHead className="text-[#4a90d9]">Year</TableHead>
                  <TableHead className="text-[#4a90d9]">High (Competitive)</TableHead>
                  <TableHead className="text-[#4a90d9]">Mid (Moderate)</TableHead>
                  <TableHead className="text-[#4a90d9]">Low (Borderline)</TableHead>
                  <TableHead className="text-[#4a90d9]">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry, index) => (
                  <TableRow
                    key={index}
                    className="border-[#2066c3]/20 hover:bg-[#2066c3]/5"
                  >
                    <TableCell className="font-semibold text-white">
                      {entry.year}
                    </TableCell>
                    <TableCell className="text-[#4a90d9]">
                      {entry.ranges.high}
                    </TableCell>
                    <TableCell className="text-[#26a69a]">
                      {entry.ranges.mid}
                    </TableCell>
                    <TableCell className="text-amber-500">
                      {entry.ranges.low}
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {entry.notes || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-slate-400">No cutoff history available</p>
        )}
      </CardContent>
    </Card>
  )
}
