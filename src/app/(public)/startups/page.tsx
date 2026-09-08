'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Globe, Users, Calendar, Building2 } from 'lucide-react'

interface Startup {
  id: string
  companyName: string
  sector: string
  city: string
  description: string
  website?: string
  yearFounded?: number
  teamSize?: string
  logo?: string
  isVerified: boolean
  needs: { skillName: string }[]
  opportunities: { id: string; title: string }[]
}

export default function Startups() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStartups()
  }, [])

  const fetchStartups = async () => {
    try {
      const response = await fetch('/api/public/startups')
      if (response.ok) {
        const data = await response.json()
        setStartups(data)
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
        <div className="animate-pulse text-foreground-secondary">Chargement des startups...</div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-subtle dark:bg-accent-subtle-dark rounded-full text-xs text-accent mb-3">
          <Building2 className="w-3 h-3" />
          Écosystème entrepreneurial
        </div>
        <h1 className="heading-lg text-foreground">Startups et jeunes entreprises</h1>
        <p className="text-foreground-secondary mt-2">
          Découvrez les entreprises maliennes qui recrutent des talents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="card hover:shadow-hover transition-all duration-300 group"
          >
            <Link href={`/startups/${startup.id}`} className="block">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl text-accent flex-shrink-0 font-light">
                  {startup.companyName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {startup.companyName}
                    </h3>
                    {startup.isVerified && (
                      <span className="badge badge-accent text-xs">Vérifiée</span>
                    )}
                  </div>
                  <p className="text-sm text-accent">{startup.sector}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-foreground-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {startup.city}
                    </span>
                    {startup.teamSize && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {startup.teamSize}
                      </span>
                    )}
                    {startup.yearFounded && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {startup.yearFounded}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground-secondary line-clamp-2 my-3">
                {startup.description}
              </p>

              {startup.needs && startup.needs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs text-foreground-secondary/60 mr-1">Recherche:</span>
                  {startup.needs.slice(0, 4).map((need, index) => (
                    <span
                      key={index}
                      className="badge badge-gray text-xs"
                    >
                      {need.skillName}
                    </span>
                  ))}
                  {startup.needs.length > 4 && (
                    <span className="badge badge-gray text-xs">
                      +{startup.needs.length - 4}
                    </span>
                  )}
                </div>
              )}
            </Link>

            <div className="flex items-center justify-between pt-3 border-t border-card-border">
              <div className="flex gap-2">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-secondary hover:text-accent transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
              <Link
                href={`/startups/${startup.id}`}
                className="text-accent hover:text-accent-dark text-sm font-medium"
              >
                Voir la startup →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {startups.length === 0 && (
        <div className="text-center py-12 bg-card rounded-2xl border border-card-border">
          <div className="text-4xl mb-4 text-foreground-secondary/30">🏢</div>
          <h3 className="heading-sm mb-2 text-foreground">Aucune startup enregistrée</h3>
          <p className="text-foreground-secondary">
            Les startups et jeunes entreprises peuvent créer leur profil sur Malinko.
          </p>
          <Link href="/register?role=STARTUP" className="btn-primary mt-4 inline-block">
            Créer mon entreprise
          </Link>
        </div>
      )}
    </div>
  )
}
