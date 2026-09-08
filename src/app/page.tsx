'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, MapPin, Briefcase, ChevronRight, User, Building2, Quote, Target, Sparkles } from 'lucide-react'
import { ProfileImage } from '@/components/profiles/ProfileImage'
import { PhotoOverlay } from '@/components/ui/PhotoOverlay'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [opportunityType, setOpportunityType] = useState('')

  const profiles = [
    {
      id: 1,
      name: 'Amadou Diallo',
      title: 'Développeur Mobile',
      city: 'Bamako',
      skills: ['Flutter', 'Dart', 'Firebase'],
      availability: 'Disponible',
      quote: 'Je crée des applications utiles pour le quotidien des Maliens.'
    },
    {
      id: 2,
      name: 'Fatoumata Traoré',
      title: 'Designer UX/UI',
      city: 'Bamako',
      skills: ['Figma', 'Adobe XD', 'Design System'],
      availability: 'Disponible',
      quote: 'Je conçois des expériences qui ont du sens.'
    },
    {
      id: 3,
      name: 'Moussa Cissé',
      title: 'Ingénieur IA',
      city: 'Sikasso',
      skills: ['Python', 'TensorFlow', 'ML'],
      availability: 'Disponible',
      quote: 'L\'IA peut transformer l\'agriculture malienne.'
    },
    {
      id: 4,
      name: 'Aminata Koné',
      title: 'Community Manager',
      city: 'Bamako',
      skills: ['Social Media', 'SEO', 'Content'],
      availability: 'Disponible',
      quote: 'Je raconte l\'histoire des marques sur les réseaux.'
    }
  ]

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-end lg:items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-graduate.jpg"
            alt="Jeune diplômée malienne"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite/50 via-anthracite/30 to-anthracite/70" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-0.5 flex z-20">
          <div className="flex-1 bg-[#14B03A]" />
          <div className="flex-1 bg-[#FCD116]" />
          <div className="flex-1 bg-[#CE1126]" />
        </div>

        <div className="absolute top-4 right-4 lg:top-6 lg:right-8 z-20 opacity-30">
          <div className="flex h-6 w-8 overflow-hidden rounded border border-white/20">
            <div className="w-1/3 bg-[#14B03A]" />
            <div className="w-1/3 bg-[#FCD116]" />
            <div className="w-1/3 bg-[#CE1126]" />
          </div>
        </div>

        <div className="container-custom relative z-20 pb-16 lg:pb-24 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs sm:text-sm mb-4 lg:mb-6 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B03A]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCD116]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126]" />
              <span className="ml-1 font-light">Plateforme malienne de talents</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] mb-4 lg:mb-6 max-w-3xl">
              Votre diplôme.
              <br />
              Vos compétences.
              <br />
              <span className="text-[#FCD116] font-light">Votre prochaine opportunité.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mb-6 lg:mb-8 font-light leading-relaxed">
              La plateforme qui connecte les jeunes diplômés maliens aux startups et entreprises qui recherchent leurs compétences.
            </p>

            <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-dark-gray/40" />
                  <input
                    type="text"
                    placeholder="Je recherche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-xl sm:rounded-lg bg-transparent focus:outline-none text-foreground text-sm sm:text-base placeholder:text-dark-gray/40"
                  />
                </div>
                <div className="relative sm:w-40 lg:w-48">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-dark-gray/40" />
                  <input
                    type="text"
                    placeholder="Où ?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-xl sm:rounded-lg bg-transparent focus:outline-none text-foreground text-sm sm:text-base placeholder:text-dark-gray/40"
                  />
                </div>
                <div className="relative sm:w-40 lg:w-48">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-dark-gray/40" />
                  <select
                    value={opportunityType}
                    onChange={(e) => setOpportunityType(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-8 py-2.5 sm:py-3 rounded-xl sm:rounded-lg bg-transparent focus:outline-none text-foreground text-sm sm:text-base appearance-none cursor-pointer"
                  >
                    <option value="">Type</option>
                    <option value="stage">Stage</option>
                    <option value="emploi">Emploi</option>
                    <option value="mission">Mission</option>
                    <option value="freelance">Freelance</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>
                <button className="btn-primary rounded-xl sm:rounded-lg px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base whitespace-nowrap">
                  Rechercher
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 px-1 pb-1">
                <span className="text-[10px] sm:text-xs text-dark-gray/40 font-light">Recherches populaires :</span>
                {['Développeur', 'Designer', 'Community Manager', 'Comptable', 'Ingénieur'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="text-[10px] sm:text-xs text-dark-gray/40 hover:text-accent transition-colors px-1.5 sm:px-2 py-0.5 rounded-full hover:bg-accent/5"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== DEUX PARCOURS ===== */}
      <section className="section-padding bg-card border-y border-card-border">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="card-accent p-6 sm:p-8 text-center group hover:border-accent/40 transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Je suis jeune diplômé</h3>
              <p className="text-sm text-foreground-secondary mb-4 max-w-xs mx-auto">
                Présentez vos compétences, vos projets et ce que vous pouvez apporter.
              </p>
              <Link href="/register?role=JUNIOR" className="btn-primary w-full sm:w-auto text-sm">
                Créer mon profil
              </Link>
            </div>
            <div className="card-accent p-6 sm:p-8 text-center group hover:border-accent/40 transition-all duration-300 border-accent/10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-4">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-light text-foreground mb-2">Je suis une startup</h3>
              <p className="text-sm text-foreground-secondary mb-4 max-w-xs mx-auto">
                Présentez votre projet et trouvez les profils dont vous avez besoin.
              </p>
              <Link href="/register?role=STARTUP" className="btn-secondary w-full sm:w-auto text-sm">
                Trouver un talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION TALENTS ===== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="heading-lg text-foreground">Des compétences qui méritent d'être vues</h2>
              <p className="text-foreground-secondary mt-1 text-sm sm:text-base">
                Découvrez les jeunes talents maliens et ce qu'ils peuvent réellement apporter à un projet.
              </p>
            </div>
            <Link href="/profiles" className="text-accent hover:text-accent-dark text-sm font-medium inline-flex items-center gap-1 whitespace-nowrap">
              Voir tous
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {profiles.map((profile) => (
              <Link key={profile.id} href={`/profiles/${profile.id}`} className="card hover:shadow-hover transition-all duration-300 group block p-5 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <ProfileImage name={profile.name} size="lg" className="mb-3" />
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors text-sm sm:text-base">
                    {profile.name}
                  </h4>
                  <p className="text-sm text-accent">{profile.title}</p>
                  <p className="text-xs text-foreground-secondary mt-1">{profile.city}</p>
                  <p className="text-xs text-foreground-secondary/70 mt-2 italic line-clamp-2">"{profile.quote}"</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {profile.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="badge badge-gray text-[10px] sm:text-xs">{skill}</span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-card-border w-full">
                    <span className="text-xs text-green-700 dark:text-green-400 font-medium">{profile.availability}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION OPPORTUNITÉS ===== */}
      <section className="section-padding bg-card border-y border-card-border">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="heading-lg text-foreground">Les opportunités du moment</h2>
              <p className="text-foreground-secondary mt-1 text-sm sm:text-base">
                Des offres qui pourraient vous correspondre
              </p>
            </div>
            <Link href="/opportunities" className="text-accent hover:text-accent-dark text-sm font-medium inline-flex items-center gap-1 whitespace-nowrap">
              Voir toutes
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: 'Ingénieur en Énergie Solaire',
                company: 'GreenTech Mali',
                type: 'Emploi',
                location: 'Bamako',
                skills: ['Énergie solaire', 'Électricité']
              },
              {
                title: 'Développeur Web Full Stack',
                company: 'Tech Mali',
                type: 'Emploi',
                location: 'Bamako',
                skills: ['React', 'Node.js', 'TypeScript']
              },
              {
                title: 'Stage en Marketing Digital',
                company: 'Agence Digital Mali',
                type: 'Stage',
                location: 'Bamako',
                skills: ['SEO', 'Social Media', 'Content']
              }
            ].map((opp, index) => (
              <div key={index} className="card hover:shadow-hover transition-all duration-300 p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-medium text-xs sm:text-sm flex-shrink-0">
                    {opp.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm sm:text-base">{opp.title}</h4>
                    <p className="text-sm text-accent">{opp.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs text-foreground-secondary mb-3">
                  <span className="badge badge-gray text-[10px] sm:text-xs">{opp.type}</span>
                  <span className="badge badge-gray text-[10px] sm:text-xs">{opp.location}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {opp.skills.map((skill, i) => (
                    <span key={i} className="badge badge-gray text-[10px] sm:text-xs">{skill}</span>
                  ))}
                </div>
                <Link href={`/opportunities/${index + 1}`} className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4 w-full mt-4 text-center">
                  Voir l'offre
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION STARTUPS ===== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="heading-lg text-foreground">Des projets qui cherchent des compétences</h2>
              <p className="text-foreground-secondary mt-1 text-sm sm:text-base">
                Des startups maliennes à la recherche de talents
              </p>
            </div>
            <Link href="/startups" className="text-accent hover:text-accent-dark text-sm font-medium inline-flex items-center gap-1 whitespace-nowrap">
              Voir toutes
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                name: 'GreenTech Mali',
                sector: 'Énergie renouvelable',
                city: 'Bamako',
                needs: ['Ingénieur Énergie', 'Marketing Digital', 'Vente'],
                verified: true,
                description: 'Solutions d\'énergie solaire pour les entreprises et les ménages maliens.'
              },
              {
                name: 'AgriInnov Mali',
                sector: 'Agrotech',
                city: 'Sikasso',
                needs: ['Python', 'Data Analysis', 'Machine Learning'],
                verified: false,
                description: 'Solutions technologiques pour les agriculteurs maliens.'
              }
            ].map((startup, index) => (
              <Link key={index} href={`/startups/${index + 1}`} className="card hover:shadow-hover transition-all duration-300 group block p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center text-lg sm:text-xl text-accent font-light flex-shrink-0">
                    {startup.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-foreground group-hover:text-accent transition-colors text-sm sm:text-base">
                        {startup.name}
                      </h4>
                      {startup.verified && (
                        <span className="badge badge-accent text-[10px] sm:text-xs">Vérifiée</span>
                      )}
                    </div>
                    <p className="text-sm text-accent">{startup.sector}</p>
                    <p className="text-xs text-foreground-secondary">{startup.city}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-foreground-secondary mt-2 line-clamp-2">
                  {startup.description}
                </p>
                <div className="mt-3 pt-3 border-t border-card-border">
                  <p className="text-[10px] sm:text-xs text-foreground-secondary/60 mb-1.5">Recherche actuellement :</p>
                  <div className="flex flex-wrap gap-1.5">
                    {startup.needs.map((need, i) => (
                      <span key={i} className="badge badge-gray text-[10px] sm:text-xs">{need}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION MOTIVATION ===== */}
      <section className="section-padding bg-card border-y border-card-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-subtle dark:bg-accent-subtle-dark rounded-full text-xs text-accent mb-3">
              <Sparkles className="w-3 h-3" />
              Inspiration
            </div>
            <h2 className="heading-lg text-foreground mb-3 sm:mb-4">
              L'avenir se construit ici.
              <br />
              <span className="text-accent font-light">Avec des jeunes, du talent et des projets.</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground-secondary max-w-2xl mx-auto">
              Chaque jour, de jeunes diplômés maliens se préparent à apporter leur pierre à l'édifice. 
              Leurs compétences, leur énergie et leur vision façonnent le Mali de demain.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="space-y-6 flex flex-col justify-center">
              <div className="card-accent p-6 relative border-l-4 border-accent">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Prêt à relever de nouveaux défis</h4>
                    <p className="text-foreground-secondary text-sm mt-1">
                      Des jeunes formés, motivés et prêts à s'investir dans des projets ambitieux.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-accent p-6 relative border-l-4 border-[#FCD116]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FCD116]/10 rounded-full flex items-center justify-center text-[#FCD116] flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Des compétences variées</h4>
                    <p className="text-foreground-secondary text-sm mt-1">
                      Du développement à la communication, en passant par le design et l'ingénierie.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-accent p-6 relative border-l-4 border-[#14B03A]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#14B03A]/10 rounded-full flex items-center justify-center text-[#14B03A] flex-shrink-0 mt-0.5">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Une vision pour le Mali</h4>
                    <p className="text-foreground-secondary text-sm mt-1">
                      Des jeunes qui croient en leur pays et veulent contribuer à son développement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link href="/profiles" className="btn-primary text-sm sm:text-base">
                  Découvrir les talents
                </Link>
              </div>
            </div>

            <div className="relative flex items-center min-h-[500px]">
              <PhotoOverlay
                src="/images/profil/amadou-diallo.jpg"
                alt="Amadou Diallo"
                position="bottom"
                overlayOpacity="medium"
                className="w-full aspect-square"
              >
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FCD116]/20 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#FCD116]" />
                    Jeune talent malien
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight">
                    L'avenir du Mali
                    <br />
                    <span className="text-[#FCD116] font-light">se construit aujourd'hui.</span>
                  </h3>
                  <p className="text-sm text-white/70 max-w-xs">
                    Des compétences, des idées, une énergie nouvelle pour bâtir un Mali plus innovant.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
                      Développement
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
                      Innovation
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
                      Créativité
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#14B03A]/80 backdrop-blur-sm rounded-full text-xs text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Prêt à contribuer
                  </div>
                  <div className="mt-2 text-xs text-white/50 font-light">
                    Amadou Diallo
                  </div>
                </div>
              </PhotoOverlay>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION MALI ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-card to-accent/5" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-subtle dark:bg-accent-subtle-dark rounded-full text-xs text-accent mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B03A]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCD116]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126]" />
                <span className="ml-1 font-light">Ancrage local</span>
              </div>
              <h2 className="heading-lg text-foreground mb-3 sm:mb-4">
                Les compétences maliennes sont partout.
              </h2>
              <p className="body-text max-w-lg">
                À Bamako, Sikasso, Ségou, Mopti, Kayes et au-delà, des jeunes se forment, construisent des projets et cherchent simplement l'occasion de montrer ce qu'ils savent faire.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/register" className="btn-primary text-sm sm:text-base">
                  Créer mon profil
                </Link>
                <Link href="/profiles" className="btn-secondary text-sm sm:text-base">
                  Découvrir les talents
                </Link>
              </div>
            </div>
            <PhotoOverlay
              src="/images/mali/mali-workspace.jpg"
              alt="Contexte professionnel malien"
              position="bottom"
              overlayOpacity="dark"
              className="w-full aspect-video"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#FCD116] uppercase tracking-wider">Au cœur du Mali</p>
                <h3 className="text-xl sm:text-2xl font-light text-white">Un potentiel immense</h3>
                <p className="text-sm text-white/70 max-w-xs">
                  Des jeunes formés, motivés et prêts à contribuer à l'innovation locale.
                </p>
              </div>
            </PhotoOverlay>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="section-padding bg-anthracite text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="heading-lg text-white">
              Votre prochaine opportunité peut commencer ici.
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Que vous cherchiez à faire vos premiers pas ou à renforcer un projet, commencez par vous présenter.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/register?role=JUNIOR" className="btn-primary text-sm sm:text-base">
                Créer mon profil
              </Link>
              <Link href="/register?role=STARTUP" className="bg-white hover:bg-ivory text-soft-black px-6 sm:px-8 py-3 rounded-lg transition-colors font-medium text-sm sm:text-base">
                Je suis une startup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
