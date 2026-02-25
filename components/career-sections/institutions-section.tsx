"use client"

import { useState } from "react"
import { Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Institution } from "@/lib/careers-data"

interface InstitutionsSectionProps {
  institutions?: Institution[]
}

export default function InstitutionsSection({
  institutions = [],
}: InstitutionsSectionProps) {
  const [activeTab, setActiveTab] = useState<Institution['type']>('public')

  const filteredInstitutions = institutions.filter((i) => i.type === activeTab)

  const institutionTypes: Institution['type'][] = ['public', 'private', 'tvet']
  const typeLabels = {
    public: 'Public Universities',
    private: 'Private Universities',
    tvet: 'TVET Institutions',
  }

  return (
    <Card className="futuristic-card border-[#26a69a]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#26a69a]/20">
            <Building className="h-5 w-5 text-[#26a69a]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Offering Institutions</h2>
        </div>

        {institutions.length > 0 ? (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {institutionTypes.map((type) => {
                const count = institutions.filter((i) => i.type === type).length
                return (
                  <Button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    variant={activeTab === type ? "default" : "outline"}
                    className={`${
                      activeTab === type
                        ? "bg-[#26a69a] text-white"
                        : "border-[#26a69a]/30 text-slate-300"
                    }`}
                  >
                    {typeLabels[type]} ({count})
                  </Button>
                )
              })}
            </div>

            {/* Institutions List */}
            {filteredInstitutions.length > 0 ? (
              <div className="grid gap-3">
                {filteredInstitutions.map((institution, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-[#26a69a]/20 bg-[#26a69a]/5 hover:bg-[#26a69a]/10 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {institution.name}
                        </h3>
                        {institution.location && (
                          <p className="text-slate-400 text-sm mb-1">
                            📍 {institution.location}
                          </p>
                        )}
                        {institution.notes && (
                          <p className="text-slate-400 text-sm">{institution.notes}</p>
                        )}
                      </div>
                      <Badge className="bg-[#26a69a]/20 text-[#26a69a] border border-[#26a69a]/30 text-xs shrink-0">
                        {typeLabels[institution.type]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No institutions in this category</p>
            )}
          </>
        ) : (
          <p className="text-slate-400">No institutions listed</p>
        )}
      </CardContent>
    </Card>
  )
}
