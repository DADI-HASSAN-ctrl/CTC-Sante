import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-primary-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-primary-600">🚕</div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-700">CTC Santé</h1>
              <p className="text-sm text-neutral-600">Centrale Taxi Conventionné</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/auth/login"
              className="px-6 py-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-secondary-700 mb-6">
            Gestion de courses sanitaires simplifiée
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Une plateforme complète pour dispatcher automatiquement vos courses,
            gérer vos abonnements taxis, et suivre vos patients en temps réel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg border border-primary-200 p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-secondary-700 mb-3">Dispatch Automatique</h3>
            <p className="text-neutral-600">
              Assignez automatiquement les courses au taxi le plus proche avec calcul de distance en temps réel.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg border border-primary-200 p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-secondary-700 mb-3">Suivi Temps Réel</h3>
            <p className="text-neutral-600">
              Visualisez la position de tous vos taxis sur une carte interactive avec mise à jour toutes les 10s.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg border border-primary-200 p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-secondary-700 mb-3">Abonnements Flexibles</h3>
            <p className="text-neutral-600">
              Gestion des abonnements taxis avec paiement Stripe sécurisé et renouvellement automatique.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg border border-primary-200 p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-secondary-700 mb-3">Calendrier Courses</h3>
            <p className="text-neutral-600">
              Vue mensuelle/hebdomadaire avec codes couleur par chauffeur et compteurs de courses.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-lg border border-primary-200 p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-secondary-700 mb-3">3 Portails</h3>
            <p className="text-neutral-600">
              Admin (gestion), Taxi (courses), et Établissement (demandes) - chacun avec son interface optimisée.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-lg border border-primary-200 p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-secondary-700 mb-3">Sécurisé</h3>
            <p className="text-neutral-600">
              Authentification JWT, contrôle d'accès par rôle, et validation complète de tous les comptes.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-secondary-700 mb-6">
              Prêt à démarrer ?
            </h3>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/register"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Créer un compte
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-3 border-2 border-secondary-700 text-secondary-700 rounded-lg hover:bg-secondary-50 transition font-semibold"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>

        {/* Test Accounts Info */}
        <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded mt-12">
          <h4 className="font-bold text-accent-900 mb-3">🧪 Comptes de test</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-accent-900">Admin</p>
              <p className="text-accent-800">admin@ctc-sante.test</p>
              <p className="text-accent-700">password123</p>
            </div>
            <div>
              <p className="font-semibold text-accent-900">Taxi</p>
              <p className="text-accent-800">taxi1@test.fr</p>
              <p className="text-accent-700">password123</p>
            </div>
            <div>
              <p className="font-semibold text-accent-900">Établissement</p>
              <p className="text-accent-800">hopital@test.fr</p>
              <p className="text-accent-700">password123</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-neutral-600">
          <p>© 2024 CTC Santé. Tous droits réservés.</p>
          <p className="text-sm mt-2">
            Built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL
          </p>
        </div>
      </footer>
    </div>
  )
}
