'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function JuniorProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    title: '',
    availability: '',
    about: '',
    whatCanIBring: '',
    whyStartup: '',
    desiredOpportunity: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (status === 'authenticated' && session?.user?.role !== 'JUNIOR') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchProfile()
    }
  }, [status, session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/junior/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          city: data.city || '',
          title: data.title || '',
          availability: data.availability || 'Disponible',
          about: data.about || '',
          whatCanIBring: data.whatCanIBring || '',
          whyStartup: data.whyStartup || '',
          desiredOpportunity: data.desiredOpportunity || '',
        })
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/junior/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage('✅ Profil mis à jour avec succès')
      } else {
        setMessage('❌ Erreur lors de la mise à jour du profil')
      }
    } catch (error) {
      setMessage('❌ Une erreur est survenue')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-dark-gray">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="flex justify-between items-center mb-8">
        <h1 className="heading-lg">Mon profil</h1>
        <Link href="/junior" className="text-primary hover:text-primary-dark">
          ← Retour au tableau de bord
        </Link>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="input-label">Prénom</label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="input-label">Nom</label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="input-label">Ville</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="input-field"
              placeholder="Bamako"
            />
          </div>
          <div>
            <label htmlFor="title" className="input-label">Métier / Domaine</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Développeur Web"
            />
          </div>
        </div>

        <div>
          <label htmlFor="availability" className="input-label">Disponibilité</label>
          <select
            id="availability"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="input-field"
          >
            <option value="Disponible">Disponible</option>
            <option value="En recherche">En recherche</option>
            <option value="Déjà en poste">Déjà en poste</option>
            <option value="Disponible à partir du">Disponible à partir du</option>
          </select>
        </div>

        <div>
          <label htmlFor="about" className="input-label">Présentez-vous en quelques mots</label>
          <textarea
            id="about"
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            className="input-field"
            rows={3}
            placeholder="Je suis un jeune développeur web passionné..."
          />
        </div>

        <div>
          <label htmlFor="whatCanIBring" className="input-label">Qu'est-ce que vous pouvez apporter à une entreprise ?</label>
          <textarea
            id="whatCanIBring"
            value={formData.whatCanIBring}
            onChange={(e) => setFormData({ ...formData, whatCanIBring: e.target.value })}
            className="input-field"
            rows={3}
            placeholder="Je peux apporter mes compétences en développement web..."
          />
        </div>

        <div>
          <label htmlFor="whyStartup" className="input-label">Pourquoi souhaitez-vous rejoindre une startup ?</label>
          <textarea
            id="whyStartup"
            value={formData.whyStartup}
            onChange={(e) => setFormData({ ...formData, whyStartup: e.target.value })}
            className="input-field"
            rows={3}
            placeholder="Je souhaite rejoindre une startup pour contribuer à des projets concrets..."
          />
        </div>

        <div>
          <label htmlFor="desiredOpportunity" className="input-label">Quel type d'opportunité recherchez-vous ?</label>
          <textarea
            id="desiredOpportunity"
            value={formData.desiredOpportunity}
            onChange={(e) => setFormData({ ...formData, desiredOpportunity: e.target.value })}
            className="input-field"
            rows={3}
            placeholder="Je recherche un poste de développeur web full stack..."
          />
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full md:w-auto">
          {saving ? 'Enregistrement...' : 'Enregistrer le profil'}
        </button>
      </form>
    </div>
  )
}
