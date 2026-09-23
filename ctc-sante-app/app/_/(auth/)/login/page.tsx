'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Placeholder: Actual auth would use NextAuth signIn
      console.log('Login attempt:', { email, password })
      // Redirect to admin dashboard for now
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🚕</div>
          <h1 className="text-3xl font-bold text-secondary-700">CTC Santé</h1>
          <p className="text-neutral-600 mt-2">Connexion</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-primary-200 shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-primary-200"></div>
            <span className="px-4 text-neutral-600 text-sm">OU</span>
            <div className="flex-1 border-t border-primary-200"></div>
          </div>

          {/* Test Accounts */}
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-primary-50 rounded border border-primary-200">
              <p className="font-semibold text-primary-700">👨‍💼 Admin</p>
              <p className="text-neutral-600">admin@ctc-sante.test</p>
            </div>
            <div className="p-3 bg-primary-50 rounded border border-primary-200">
              <p className="font-semibold text-primary-700">🚕 Taxi</p>
              <p className="text-neutral-600">taxi1@test.fr</p>
            </div>
            <div className="p-3 bg-primary-50 rounded border border-primary-200">
              <p className="font-semibold text-primary-700">🏥 Établissement</p>
              <p className="text-neutral-600">hopital@test.fr</p>
            </div>
            <p className="text-center text-neutral-500">Mot de passe: password123</p>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-neutral-600">
            Pas encore inscrit ?{' '}
            <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
