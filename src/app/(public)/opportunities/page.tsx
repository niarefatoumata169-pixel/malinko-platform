'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Briefcase } from 'lucide-react'

interface Opportunity {
  id: string
  title: string
  type: string
  location: string
  remote: boolean
  requiredSkills: string
  description: string
  isActive: boolean
  startupProfile: {
    companyName: string
    sector: string
    city: string
  }
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/public/opportunities')
      if (response.ok) {
        const data = await response.json()
        setOpportunities(data)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-foreground-secondary">Chargement des opportunités...</div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="heading-lg text-foreground">Les opportunités du moment</h1>
        <p className="text-foreground-secondary mt-2">
          Découvrez les offres publiées par les startups et jeunes entreprises
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="card hover:shadow-hover transition-all duration-300 p-5 sm:p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-medium text-sm sm:text-lg flex-shrink-0">
                    {opportunity.startupProfile?.companyName?.charAt(0) || 'S'}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm sm:text-base">{opportunity.title}</h3>
                    <p className="text-sm text-accent">{opportunity.startupProfile?.companyName || 'Startup'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-xs sm:text-sm text-foreground-secondary">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                    {opportunity.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {opportunity.location}
                  </span>
                  {opportunity.remote && (
                    <span className="text-green-600">Télétravail</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {opportunity.requiredSkills.split(',').slice(0, 4).map((skill, index) => (
                    <span key={index} className="badge badge-gray text-[10px] sm:text-xs">
                      {skill.trim()}
                    </span>
                  ))}
                  {opportunity.requiredSkills.split(',').length > 4 && (
                    <span className="badge badge-gray text-[10px] sm:text-xs">
                      +{opportunity.requiredSkills.split(',').length - 4}
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/opportunities/${opportunity.id}`}
                className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4 whitespace-nowrap"
              >
                Voir l'offre
              </Link>
            </div>
          </div>
        ))}
      </div>

      {opportunities.length === 0 && (
        <div className="text-center py-12 bg-card rounded-2xl border border-card-border">
          <h3 className="heading-sm mb-2 text-foreground">Aucune opportunité disponible</h3>
          <p className="text-foreground-secondary">
            De nouvelles offres seront bientôt publiées.
          </p>
        </div>
      )}
    </div>
  )
}
