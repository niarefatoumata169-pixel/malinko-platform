'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, MapPin, X } from 'lucide-react'

interface Profile {
  id: string
  firstName: string
  lastName: string
  city: string
  title: string
  availability: string
  skills: { name: string }[]
  profilePicture?: string
}

export default function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [allSkills, setAllSkills] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    const skills = new Set<string>()
    const citySet = new Set<string>()
    profiles.forEach(p => {
      citySet.add(p.city)
      p.skills?.forEach(s => skills.add(s.name))
    })
    setAllSkills(Array.from(skills).sort())
    setCities(Array.from(citySet).sort())
  }, [profiles])

  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/public/profiles')
      if (response.ok) {
        const data = await response.json()
        setProfiles(data)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
      searchTerm === '' ||
      profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSkill = 
      skillFilter === '' ||
      profile.skills?.some(s => s.name.toLowerCase() === skillFilter.toLowerCase())
    
    const matchesCity = 
      cityFilter === '' ||
      profile.city.toLowerCase() === cityFilter.toLowerCase()
    
    return matchesSearch && matchesSkill && matchesCity
  })

  const hasFilters = searchTerm || skillFilter || cityFilter

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-foreground-secondary">Chargement des profils...</div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="heading-lg text-foreground">Jeunes diplômés maliens</h1>
        <p className="text-foreground-secondary mt-2">
          Découvrez les talents prêts à contribuer à vos projets
        </p>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-card rounded-2xl shadow-card p-6 mb-8 border border-card-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary/40" />
            <input
              type="text"
              placeholder="Rechercher par nom, métier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Toutes les compétences</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-foreground-secondary/60">Filtres actifs :</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-ivory dark:bg-anthracite text-sm text-foreground rounded">
                {searchTerm}
                <button onClick={() => setSearchTerm('')} className="text-foreground-secondary/40 hover:text-foreground-secondary">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {skillFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-ivory dark:bg-anthracite text-sm text-foreground rounded">
                {skillFilter}
                <button onClick={() => setSkillFilter('')} className="text-foreground-secondary/40 hover:text-foreground-secondary">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {cityFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-ivory dark:bg-anthracite text-sm text-foreground rounded">
                {cityFilter}
                <button onClick={() => setCityFilter('')} className="text-foreground-secondary/40 hover:text-foreground-secondary">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('')
                setSkillFilter('')
                setCityFilter('')
              }}
              className="text-sm text-accent hover:text-accent-dark"
            >
              Tout effacer
            </button>
          </div>
        )}
      </div>

      {/* Résultats */}
      <div className="mb-4">
        <p className="text-sm text-foreground-secondary/60">
          {filteredProfiles.length} talent{filteredProfiles.length > 1 ? 's' : ''} trouvé{filteredProfiles.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <Link
            key={profile.id}
            href={`/profiles/${profile.id}`}
            className="card hover:shadow-hover transition-all duration-300 group block"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-xl text-accent flex-shrink-0 font-light">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-accent">{profile.title}</p>
                <div className="flex items-center gap-1 text-xs text-foreground-secondary mt-1">
                  <MapPin className="w-3 h-3" />
                  {profile.city}
                </div>
              </div>
            </div>

            {profile.skills && profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-gray text-xs"
                  >
                    {skill.name}
                  </span>
                ))}
                {profile.skills.length > 4 && (
                  <span className="badge badge-gray text-xs">
                    +{profile.skills.length - 4}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-card-border/50">
              <span className={`text-xs ${profile.availability === 'Disponible' ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                {profile.availability}
              </span>
              <span className="text-accent group-hover:text-accent-dark text-sm font-medium">
                Voir le profil →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12 bg-card rounded-2xl border border-card-border">
          <h3 className="heading-sm mb-2 text-foreground">Aucun profil trouvé</h3>
          <p className="text-foreground-secondary">
            Aucun profil ne correspond à vos critères de recherche.
          </p>
          <p className="text-sm text-foreground-secondary/60 mt-1">
            Essayez de modifier vos filtres.
          </p>
        </div>
      )}
    </div>
  )
}
