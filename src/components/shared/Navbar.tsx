'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const getDashboardLink = () => {
    if (!session) return null
    if (session.user?.role === 'JUNIOR') return '/junior'
    if (session.user?.role === 'STARTUP') return '/startup'
    return null
  }

  const dashboardLink = getDashboardLink()

  return (
    <nav className="bg-card border-b border-card-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-light tracking-tight text-foreground">
              Malinko
            </span>
            <span className="text-xs font-light text-accent tracking-wider uppercase">
              Mali
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/profiles" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">
              Jeunes diplômés
            </Link>
            <Link href="/startups" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">
              Startups
            </Link>
            <Link href="/opportunities" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">
              Opportunités
            </Link>
            <Link href="/how-it-works" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">
              Comment ça marche
            </Link>
            <Link href="/why-malinko" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">
              Pourquoi Malinko
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <>
                {dashboardLink && (
                  <Link href={dashboardLink} className="text-accent hover:text-accent-dark transition-colors text-sm font-medium">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-foreground-secondary hover:text-foreground transition-colors text-sm"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">
                  Connexion
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-5">
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-ivory dark:hover:bg-anthracite transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-card-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/profiles"
                className="text-foreground-secondary hover:text-foreground transition-colors text-base"
                onClick={toggleMenu}
              >
                Jeunes diplômés
              </Link>
              <Link
                href="/startups"
                className="text-foreground-secondary hover:text-foreground transition-colors text-base"
                onClick={toggleMenu}
              >
                Startups
              </Link>
              <Link
                href="/opportunities"
                className="text-foreground-secondary hover:text-foreground transition-colors text-base"
                onClick={toggleMenu}
              >
                Opportunités
              </Link>
              <Link
                href="/how-it-works"
                className="text-foreground-secondary hover:text-foreground transition-colors text-base"
                onClick={toggleMenu}
              >
                Comment ça marche
              </Link>
              <Link
                href="/why-malinko"
                className="text-foreground-secondary hover:text-foreground transition-colors text-base"
                onClick={toggleMenu}
              >
                Pourquoi Malinko
              </Link>
              <div className="pt-4 border-t border-card-border flex flex-col space-y-3">
                {session ? (
                  <>
                    {dashboardLink && (
                      <Link
                        href={dashboardLink}
                        className="text-accent hover:text-accent-dark text-base font-medium"
                        onClick={toggleMenu}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut()
                        toggleMenu()
                      }}
                      className="text-foreground-secondary hover:text-foreground text-base text-left"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-foreground-secondary hover:text-foreground transition-colors text-base"
                      onClick={toggleMenu}
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/register"
                      className="btn-primary text-center text-sm py-3"
                      onClick={toggleMenu}
                    >
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
