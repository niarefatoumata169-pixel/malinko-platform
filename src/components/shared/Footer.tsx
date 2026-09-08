import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-anthracite text-white/80">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-medium mb-4">Malinko</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/why-malinko" className="hover:text-white transition-colors">
                  Pourquoi Malinko
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Jeunes diplômés</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profiles" className="hover:text-white transition-colors">
                  Voir les profils
                </Link>
              </li>
              <li>
                <Link href="/register?role=JUNIOR" className="hover:text-white transition-colors">
                  Créer mon profil
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition-colors">
                  Opportunités
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Startups</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/startups" className="hover:text-white transition-colors">
                  Voir les startups
                </Link>
              </li>
              <li>
                <Link href="/register?role=STARTUP" className="hover:text-white transition-colors">
                  Créer mon entreprise
                </Link>
              </li>
              <li>
                <Link href="/opportunities/new" className="hover:text-white transition-colors">
                  Publier une opportunité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <span className="text-white/60">© {currentYear} Malinko</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>
            Une plateforme qui connecte les jeunes diplômés maliens aux startups et jeunes entreprises.
          </p>
        </div>
      </div>
    </footer>
  )
}
