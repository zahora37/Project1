import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wild Roots Custom Landscaping | Arizona Landscaping Experts',
  description:
    'Wild Roots Custom Landscaping, LLC — Arizona\'s trusted landscaping company. Artificial turf, pavers, irrigation, weed management & more. Licensed & Insured. ROC #357770. Call (805) 478-2466.',
  keywords:
    'landscaping arizona, artificial turf, paver installation, irrigation systems, weed management, landscape maintenance, ROC 357770, wild roots landscaping',
  openGraph: {
    title: 'Wild Roots Custom Landscaping, LLC',
    description: 'Transform your outdoor space today. Arizona\'s certified landscaping experts. Free estimates.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
