'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') || 'JUNIOR'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: defaultRole as 'JUNIOR' | 'STARTUP',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue')
        setLoading(false)
        return
      }

      router.push('/login?registered=true')
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="heading-md">Créer un compte</h2>
            <p className="text-dark-gray text-sm mt-2">
              Rejoignez la communauté Malinko
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="input-label">
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="text-xs text-dark-gray/60 mt-1">Minimum 6 caractères</p>
            </div>

            <div>
              <label className="input-label">Je suis</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'JUNIOR' })}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    formData.role === 'JUNIOR'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-light-gray hover:border-primary/30'
                  }`}
                >
                  Jeune diplômé
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'STARTUP' })}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    formData.role === 'STARTUP'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-light-gray hover:border-primary/30'
                  }`}
                >
                  Startup
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-dark-gray">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
