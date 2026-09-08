import Link from 'next/link'
import { Target, Sparkles, Users, Heart, Shield, Rocket } from 'lucide-react'

export default function WhyMalinko() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-subtle dark:bg-accent-subtle-dark rounded-full text-xs text-accent mb-3">
            <Sparkles className="w-3 h-3" />
            Pourquoi Malinko
          </div>
          <h1 className="heading-xl text-foreground">Pourquoi choisir Malinko ?</h1>
          <p className="body-text mt-4 max-w-2xl mx-auto">
            Une plateforme conçue au Mali, pour les Maliens, avec une vision claire : connecter les talents aux opportunités.
          </p>
        </div>

        <div className="space-y-8">
          <div className="card-accent p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="heading-sm text-foreground mb-2">Une mission claire</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  Malinko existe pour rapprocher les jeunes diplômés maliens des startups et jeunes entreprises 
                  qui recherchent leurs compétences. Nous croyons que chaque talent mérite d'être vu et chaque 
                  projet mérite les bonnes compétences.
                </p>
              </div>
            </div>
          </div>

          <div className="card-accent p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FCD116]/10 rounded-xl flex items-center justify-center text-[#FCD116] flex-shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="heading-sm text-foreground mb-2">Une plateforme humaine</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  Nous mettons l'humain au centre. Chaque profil est une personne avec des compétences, 
                  des ambitions et une histoire. Nous aidons les recruteurs à découvrir la personne derrière 
                  le CV, grâce à des questions simples comme "Si j'étais face au recruteur...".
                </p>
              </div>
            </div>
          </div>

          <div className="card-accent p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#14B03A]/10 rounded-xl flex items-center justify-center text-[#14B03A] flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="heading-sm text-foreground mb-2">Un ancrage malien fort</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  Malinko est conçu au Mali, pour les Maliens. Les photographies, les profils, les startups 
                  et les opportunités reflètent la réalité du Mali. Nous mettons en avant les compétences 
                  locales et les projets qui font bouger le pays.
                </p>
              </div>
            </div>
          </div>

          <div className="card-accent p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="heading-sm text-foreground mb-2">Simple et transparent</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  Pas de fonctionnalités complexes inutiles. Malinko est une plateforme simple, rapide et 
                  efficace. Les jeunes diplômés créent leur profil en quelques minutes, les startups trouvent 
                  les compétences dont elles ont besoin en quelques clics.
                </p>
              </div>
            </div>
          </div>

          <div className="card-accent p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FCD116]/10 rounded-xl flex items-center justify-center text-[#FCD116] flex-shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h2 className="heading-sm text-foreground mb-2">Une vision d'avenir</h2>
                <p className="text-foreground-secondary leading-relaxed">
                  Nous croyons que le Mali regorge de talents. Notre ambition est de devenir la référence 
                  pour la mise en relation entre les jeunes diplômés et les entreprises au Mali. Nous 
                  construisons un écosystème où les compétences maliennes sont reconnues et valorisées.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-anthracite text-white rounded-2xl p-8 sm:p-12">
          <h2 className="heading-md text-white mb-4">Prêt à rejoindre Malinko ?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Que vous soyez jeune diplômé ou startup, votre place est ici.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register?role=JUNIOR" className="btn-primary">
              Créer mon profil
            </Link>
            <Link href="/register?role=STARTUP" className="bg-white hover:bg-ivory text-soft-black px-6 py-3 rounded-lg transition-colors font-medium">
              Je suis une startup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
