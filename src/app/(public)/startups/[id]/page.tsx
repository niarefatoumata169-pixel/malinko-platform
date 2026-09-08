'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Globe, Users, Calendar, Briefcase, CheckCircle, Building2, Mail } from 'lucide-react'

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
  opportunities: { id: string; title: string; type: string; location: string; remote: boolean }[]
  user: { email: string; name: string }
}

export default function StartupDetail() {
  const params = useParams()
  const [startup, setStartup] = useState<Startup | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStartup()
  }, [params.id])

  const fetchStartup = async () => {
    try {
      const response = await fetch(`/api/public/startups/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setStartup(data)
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
        <div className="animate-pulse text-foreground-secondary">Chargement...</div>
      </div>
    )
  }

  if (!startup) {
    return (
      <div className="container-custom section-padding text-center">
        <h2 className="heading-md mb-4 text-foreground">Startup non trouvée</h2>
        <p className="text-foreground-secondary">Cette startup n'existe pas ou a été supprimée.</p>
        <Link href="/startups" className="text-accent hover:text-accent-dark mt-4 inline-block">
          Retour à la liste des startups
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <Link href="/startups" className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour aux startups
        </Link>
      </div>

      {/* En-tête */}
      <div className="card-accent mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center text-3xl text-accent flex-shrink-0 font-light">
            {startup.companyName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="heading-lg text-foreground">{startup.companyName}</h1>
              {startup.isVerified && (
                <span className="inline-flex items-center gap-1 badge badge-accent">
                  <CheckCircle className="w-3 h-3" />
                  Vérifiée
                </span>
              )}
            </div>
            <p className="text-xl text-accent font-medium">{startup.sector}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {startup.city}
              </span>
              {startup.teamSize && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {startup.teamSize}
                </span>
              )}
              {startup.yearFounded && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Fondée en {startup.yearFounded}
                </span>
              )}
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-accent hover:text-accent-dark"
                >
                  <Globe className="w-4 h-4" />
                  Site web
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button className="btn-primary w-full md:w-auto">
              <Mail className="w-4 h-4 mr-2" />
              Contacter
            </button>
            {startup.opportunities.length > 0 && (
              <Link href={`/opportunities?startup=${startup.id}`} className="btn-secondary w-full md:w-auto text-center">
                Voir les opportunités
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* À propos */}
          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground">À propos</h2>
            <p className="text-foreground-secondary leading-relaxed">{startup.description}</p>
          </div>

          {/* Projets - section ajoutée pour l'harmonisation */}
          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground">Projet</h2>
            <p className="text-foreground-secondary leading-relaxed">
              {startup.companyName} est une startup malienne qui œuvre dans le secteur de la {startup.sector}. 
              L'entreprise a été fondée en {startup.yearFounded} et travaille à développer des solutions innovantes 
              pour le marché local.
            </p>
          </div>

          {/* Opportunités */}
          {startup.opportunities && startup.opportunities.length > 0 && (
            <div className="card">
              <h2 className="heading-sm mb-4 flex items-center gap-2 text-foreground">
                <Briefcase className="w-5 h-5 text-accent" />
                Opportunités
              </h2>
              <div className="space-y-4">
                {startup.opportunities.map((opp) => (
                  <div key={opp.id} className="border-b border-card-border last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-foreground">{opp.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-foreground-secondary">
                      <span className="badge badge-gray text-xs">{opp.type}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {opp.location}
                      </span>
                      {opp.remote && (
                        <span className="badge badge-accent text-xs">Télétravail</span>
                      )}
                    </div>
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="text-accent hover:text-accent-dark text-sm inline-block mt-2"
                    >
                      Voir l'offre →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-medium text-foreground mb-4">Compétences recherchées</h3>
            {startup.needs && startup.needs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {startup.needs.map((need, index) => (
                  <span
                    key={index}
                    className="badge badge-gray"
                  >
                    {need.skillName}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-foreground-secondary/60">Aucune compétence spécifiée</p>
            )}
          </div>

          <div className="card">
            <h3 className="font-medium text-foreground mb-4">À propos de l'équipe</h3>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>Équipe de {startup.teamSize || 'plusieurs'} personnes</p>
              <p>Basée à {startup.city}</p>
              {startup.yearFounded && <p>Créée en {startup.yearFounded}</p>}
            </div>
          </div>

          <div className="card-accent">
            <h3 className="font-medium text-foreground mb-4">Intéressé par cette startup ?</h3>
            <div className="space-y-3">
              <Link href="/profiles" className="btn-primary w-full text-center block">
                Voir les talents
              </Link>
              <p className="text-xs text-foreground-secondary/60 text-center">
                Consultez les profils des jeunes diplômés qui pourraient correspondre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
