import Link from 'next/link'
import { Target, Users, Lightbulb, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-subtle dark:bg-accent-subtle-dark rounded-full text-xs text-accent mb-3">
            À propos
          </div>
          <h1 className="heading-xl text-foreground">Malinko</h1>
          <p className="body-text mt-4">
            Une plateforme qui connecte les jeunes diplômés maliens aux startups et jeunes entreprises.
          </p>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Notre raison d'être
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Malinko est né d'un constat simple : de nombreux jeunes diplômés maliens 
              ont des difficultés à accéder à leur première expérience professionnelle, 
              tandis que les startups et jeunes entreprises peinent à trouver les compétences 
              dont elles ont besoin pour se développer.
            </p>
          </div>

          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              Notre mission
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Notre mission est de créer un pont entre la formation et l'emploi, 
              entre les projets et les compétences. Nous voulons offrir aux jeunes 
              diplômés maliens une visibilité auprès des structures qui recrutent, 
              et permettre aux startups de trouver rapidement les talents dont elles ont besoin.
            </p>
          </div>

          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              Pourquoi Malinko
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Au Mali, le potentiel des jeunes diplômés est immense. Ils possèdent des 
              compétences, des connaissances et une motivation importante. Ce qui leur 
              manque souvent, c'est un espace où ils peuvent être vus et reconnus 
              pour ce qu'ils savent faire.
            </p>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              Malinko est cette plateforme. Un espace professionnel, moderne et 
              chaleureux où les talents maliens peuvent se présenter et où les 
              entreprises peuvent les découvrir.
            </p>
          </div>

          <div className="card">
            <h2 className="heading-sm mb-4 text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Notre engagement
            </h2>
            <ul className="space-y-3 text-foreground-secondary">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">—</span>
                <span>Proposer une plateforme simple, rapide et efficace</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">—</span>
                <span>Valoriser les compétences et les parcours des jeunes diplômés</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">—</span>
                <span>Faciliter la mise en relation avec les startups et jeunes entreprises</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">—</span>
                <span>Contribuer à l'écosystème entrepreneurial malien</span>
              </li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <Link href="/register" className="btn-primary">
              Rejoindre Malinko
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
