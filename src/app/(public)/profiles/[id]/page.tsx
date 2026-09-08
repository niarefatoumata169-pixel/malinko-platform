'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, MapPin, GraduationCap, Award, Languages } from 'lucide-react'

interface Skill {
  id: string
  name: string
  level?: string
}

interface Education {
  id: string
  school: string
  degree: string
  field?: string
  startYear: number
  endYear?: number
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  url?: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  year: number
}

interface Language {
  id: string
  name: string
  level: string
}

interface Profile {
  id: string
  firstName: string
  lastName: string
  city: string
  title: string
  availability: string
  about: string
  whatCanIBring: string
  whyStartup: string
  desiredOpportunity: string
  cvUrl?: string
  profilePicture?: string
  isVerified: boolean
  skills: Skill[]
  education: Education[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
  user: {
    email: string
    name: string
  }
}

export default function ProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [params.id])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/public/profile/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
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
        <div className="animate-pulse text-dark-gray">Chargement du profil...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container-custom section-padding text-center">
        <h2 className="heading-md mb-4">Profil non trouvé</h2>
        <p className="text-dark-gray">Ce profil n'existe pas ou a été supprimé.</p>
        <Link href="/profiles" className="text-primary hover:text-primary-dark mt-4 inline-block">
          Retour à la liste des profils
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/profiles" className="inline-flex items-center gap-2 text-dark-gray hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour aux profils
        </Link>
      </div>

      {/* En-tête du profil */}
      <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-24 h-24 bg-ivory rounded-full flex items-center justify-center text-2xl text-primary-light flex-shrink-0 font-light">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="heading-lg">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-xl text-primary font-medium">{profile.title}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1 text-dark-gray">
                <MapPin className="w-4 h-4" />
                {profile.city}
              </span>
              <span className={`flex items-center gap-1 ${profile.availability === 'Disponible' ? 'text-green-700' : 'text-amber-700'}`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                {profile.availability}
              </span>
              {profile.isVerified && (
                <span className="flex items-center gap-1 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Profil vérifié
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowContact(!showContact)}
              className="btn-primary w-full md:w-auto"
            >
              Contacter
            </button>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="btn-secondary flex items-center justify-center gap-2 w-full md:w-auto text-sm"
              >
                <Download className="w-4 h-4" />
                Voir le CV
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      {showContact && (
        <div className="bg-ivory rounded-2xl p-6 mb-8 border border-light-gray">
          <h3 className="font-medium text-soft-black mb-4">Contacter {profile.firstName} {profile.lastName}</h3>
          <form className="space-y-4">
            <div>
              <label className="input-label">Votre email</label>
              <input type="email" className="input-field" placeholder="recruteur@entreprise.com" />
            </div>
            <div>
              <label className="input-label">Message</label>
              <textarea
                className="input-field"
                rows={4}
                placeholder="Bonjour, je suis intéressé par votre profil..."
              />
            </div>
            <button type="submit" className="btn-primary">
              Envoyer le message
            </button>
          </form>
          <p className="text-xs text-dark-gray/60 mt-4">
            Votre message sera envoyé par email à {profile.firstName} {profile.lastName}
          </p>
        </div>
      )}

      {/* Contenu du profil */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* À propos */}
          {profile.about && (
            <div className="card">
              <h2 className="heading-sm mb-4">À propos</h2>
              <p className="text-dark-gray leading-relaxed">{profile.about}</p>
            </div>
          )}

          {/* "Si j'étais face au recruteur" - Section */}
          <div className="card bg-ivory/30 border border-ivory">
            <h2 className="heading-sm mb-6 text-soft-black">Si j'étais face au recruteur</h2>
            <div className="space-y-6">
              {profile.about && (
                <div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Présentation</p>
                  <p className="text-dark-gray">{profile.about}</p>
                </div>
              )}
              {profile.whatCanIBring && (
                <div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Ce que je peux apporter</p>
                  <p className="text-dark-gray">{profile.whatCanIBring}</p>
                </div>
              )}
              {profile.desiredOpportunity && (
                <div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Opportunité recherchée</p>
                  <p className="text-dark-gray">{profile.desiredOpportunity}</p>
                </div>
              )}
              {profile.whyStartup && (
                <div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Pourquoi une startup</p>
                  <p className="text-dark-gray">{profile.whyStartup}</p>
                </div>
              )}
            </div>
          </div>

          {/* Projets */}
          {profile.projects && profile.projects.length > 0 && (
            <div className="card">
              <h2 className="heading-sm mb-4">Projets</h2>
              <div className="space-y-4">
                {profile.projects.map((project) => (
                  <div key={project.id} className="border-b border-light-gray last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-soft-black">{project.name}</h4>
                    <p className="text-sm text-dark-gray mt-1">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.split(',').map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-ivory text-xs text-dark-gray rounded">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark text-sm mt-2 inline-block">
                        Voir le projet →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Compétences */}
          <div className="card">
            <h3 className="font-medium text-soft-black mb-4">Compétences</h3>
            {profile.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1.5 bg-ivory text-dark-gray rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-dark-gray/60">Aucune compétence renseignée</p>
            )}
          </div>

          {/* Formation */}
          <div className="card">
            <h3 className="font-medium text-soft-black mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Formation
            </h3>
            {profile.education && profile.education.length > 0 ? (
              <div className="space-y-4">
                {profile.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-medium text-soft-black text-sm">{edu.degree}</h4>
                    <p className="text-sm text-dark-gray">{edu.school}</p>
                    <p className="text-xs text-dark-gray/60">
                      {edu.startYear} — {edu.endYear || 'Présent'}
                    </p>
                    {edu.field && (
                      <p className="text-xs text-dark-gray/60">Domaine : {edu.field}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-dark-gray/60">Aucune formation renseignée</p>
            )}
          </div>

          {/* Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (
            <div className="card">
              <h3 className="font-medium text-soft-black mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h3>
              <div className="space-y-3">
                {profile.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="font-medium text-soft-black text-sm">{cert.name}</h4>
                    <p className="text-sm text-dark-gray">{cert.issuer}</p>
                    <p className="text-xs text-dark-gray/60">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Langues */}
          {profile.languages && profile.languages.length > 0 && (
            <div className="card">
              <h3 className="font-medium text-soft-black mb-4 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Langues
              </h3>
              <div className="space-y-2">
                {profile.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-sm text-dark-gray">{lang.name}</span>
                    <span className="text-xs text-primary">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
