import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Malinko - Talents maliens, opportunités locales',
  description:
    'Une plateforme qui connecte les jeunes diplômés maliens aux startups et jeunes entreprises qui recherchent leurs compétences.',
  keywords: ['Mali', 'talents', 'startups', 'emploi', 'jeunes diplômés', 'compétences', 'opportunités'],
  authors: [{ name: 'Malinko' }],
  openGraph: {
    title: 'Malinko - Talents maliens, opportunités locales',
    description:
      'Une plateforme qui connecte les jeunes diplômés maliens aux startups et jeunes entreprises qui recherchent leurs compétences.',
    url: 'https://malinko.com',
    siteName: 'Malinko',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
