'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase } from 'lucide-react'

interface Opportunity {
  id: string
  title: string
  type: string
  location: string
  remote: boolean
  requiredSkills: string
  description: string
  idealProfile: string
  applicationDeadline?: string
  isActive: boolean
  startupProfile: {
    companyName: string
    sector: string
    city: string
  }
}

export default function OpportunityDetail() {
  const params = useParams()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpportunity()
  }, [params.id])

  const fetchOpportunity = async () => {
    try {
      const response = await fetch(`/api/public/opportunities/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setOpportunity(data)
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

  if (!opportunity) {
    return (
      <div className="container-custom section-padding text-center">
        <h2 className="heading-md mb-4 text-foreground">Offre non trouvée</h2>
        <p className="text-foreground-secondary">Cette offre n'existe pas ou a été supprimée.</p>
        <Link href="/opportunities" className="text-accent hover:text-accent-dark mt-4 inline-block">
          Retour aux opportunités
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <Link href="/opportunities" className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour aux opportunités
        </Link>
      </div>

      <div className="card-accent mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl text-accent flex-shrink-0 font-light">
            {opportunity.startupProfile?.companyName?.charAt(0) || 'S'}
          </div>
          <div className="flex-1">
            <h1 className="heading-lg text-foreground">{opportunity.title}</h1>
            <p className="text-xl text-accent font-medium">{opportunity.startupProfile?.companyName || 'Startup'}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {opportunity.type}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {opportunity.location}
              </span>
              {opportunity.remote && (
                <span className="flex items-center gap-1 text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  Télétravail
                </span>
              )}
            </div>
          </div>
          <Link href="/register?role=JUNIOR" className="btn-primary w-full md:w-auto text-center">
            Postuler
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground">Description</h2>
            <p className="text-foreground-secondary leading-relaxed">{opportunity.description}</p>
          </div>

          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground">Profil recherché</h2>
            <p className="text-foreground-secondary leading-relaxed">{opportunity.idealProfile}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-medium text-foreground mb-4">Compétences requises</h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.requiredSkills.split(',').map((skill, index) => (
                <span key={index} className="badge badge-gray">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="card-accent">
            <h3 className="font-medium text-foreground mb-4">Intéressé ?</h3>
            <div className="space-y-3">
              <Link href="/register?role=JUNIOR" className="btn-primary w-full text-center block">
                Postuler maintenant
              </Link>
              <p className="text-xs text-foreground-secondary/60 text-center">
                Créez votre profil pour postuler à cette offre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
