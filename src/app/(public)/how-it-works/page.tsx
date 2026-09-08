import Link from 'next/link'
import { UserPlus, Brain, Search, MessageCircle } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-subtle dark:bg-accent-subtle-dark rounded-full text-xs text-accent mb-3">
            Guide
          </div>
          <h1 className="heading-xl text-foreground">Comment ça marche</h1>
          <p className="body-text mt-4 max-w-2xl mx-auto">
            Malinko connecte les jeunes diplômés maliens aux startups et jeunes entreprises en quelques étapes simples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Pour les jeunes diplômés */}
          <div className="card-accent">
            <h2 className="heading-md text-foreground mb-6">Pour les jeunes diplômés</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Créez votre profil</h4>
                  <p className="text-sm text-foreground-secondary">Inscrivez-vous gratuitement et présentez votre parcours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Présentez vos compétences</h4>
                  <p className="text-sm text-foreground-secondary">Mettez en avant vos projets, formations et réalisations.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Découvrez des opportunités</h4>
                  <p className="text-sm text-foreground-secondary">Parcourez les offres publiées par les startups.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Connectez-vous</h4>
                  <p className="text-sm text-foreground-secondary">Soyez contacté par les recruteurs ou postulez aux offres.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/register?role=JUNIOR" className="btn-primary">
                Créer mon profil
              </Link>
            </div>
          </div>

          {/* Pour les startups */}
          <div className="card-accent">
            <h2 className="heading-md text-foreground mb-6">Pour les startups</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Créez votre entreprise</h4>
                  <p className="text-sm text-foreground-secondary">Inscrivez votre startup et présentez votre projet.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Publiez vos besoins</h4>
                  <p className="text-sm text-foreground-secondary">Décrivez les compétences et profils que vous recherchez.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Découvrez les talents</h4>
                  <p className="text-sm text-foreground-secondary">Consultez les profils des jeunes diplômés disponibles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Contactez les candidats</h4>
                  <p className="text-sm text-foreground-secondary">Contactez directement les talents qui vous intéressent.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/register?role=STARTUP" className="btn-primary">
                Créer mon entreprise
              </Link>
            </div>
          </div>
        </div>

        {/* Section finale */}
        <div className="text-center bg-card border border-card-border rounded-2xl p-8">
          <h2 className="heading-md text-foreground mb-4">Prêt à commencer ?</h2>
          <p className="text-foreground-secondary mb-6">
            Rejoignez Malinko dès aujourd'hui et faites le premier pas vers votre avenir professionnel.
          </p>
          <Link href="/register" className="btn-primary">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  )
}
