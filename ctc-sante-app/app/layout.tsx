import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CTC Santé - Centrale Taxi Conventionné',
  description: 'Gestion de courses sanitaires avec dispatch automatique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  )
}
