'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ActivityChart } from '@/components/dashboard/ActivityChart'

export default function JuniorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (status === 'authenticated' && session?.user?.role !== 'JUNIOR') {
      router.push('/')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-foreground-secondary">Chargement...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container-custom section-padding">
      <div className="flex justify-between items-center mb-8">
        <h1 className="heading-lg text-foreground">Tableau de bord</h1>
        <Link href="/junior/profile" className="btn-primary text-sm py-2 px-4">
          Modifier mon profil
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-accent">
          <p className="text-sm text-foreground-secondary">Profil complété</p>
          <p className="text-3xl font-light text-accent mt-1">65%</p>
          <Link href="/junior/profile" className="text-sm text-accent hover:text-accent-dark mt-3 inline-block">
            Compléter →
          </Link>
        </div>
        <div className="card-accent">
          <p className="text-sm text-foreground-secondary">Vues de mon profil</p>
          <p className="text-3xl font-light text-accent mt-1">12</p>
        </div>
        <div className="card-accent">
          <p className="text-sm text-foreground-secondary">Candidatures</p>
          <p className="text-3xl font-light text-accent mt-1">3</p>
        </div>
        <div className="card-accent">
          <p className="text-sm text-foreground-secondary">Messages</p>
          <p className="text-3xl font-light text-accent mt-1">2</p>
        </div>
      </div>

      {/* Graphique et opportunités */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="heading-sm mb-4 text-foreground">Activité</h3>
          <ActivityChart />
        </div>

        <div className="card">
          <h3 className="heading-sm mb-4 text-foreground">Opportunités recommandées</h3>
          <div className="space-y-4">
            <div className="border-b border-card-border pb-4 last:border-0">
              <h4 className="font-medium text-foreground">Développeur Web Full Stack</h4>
              <p className="text-sm text-foreground-secondary">Tech Mali • Bamako</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge badge-accent text-xs">4 compétences</span>
                <span className="badge badge-gray text-xs">Correspondance élevée</span>
              </div>
              <Link href="/opportunities/1" className="btn-primary text-sm py-1 px-4 mt-2 inline-block">
                Voir l&apos;offre
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/opportunities" className="btn-primary">
          Découvrir plus d&apos;opportunités
        </Link>
      </div>
    </div>
  )
}
