import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Green Horizon Landscaping | Professional Lawn & Landscape Services',
  description:
    'Transform your outdoor space with Green Horizon Landscaping. Expert lawn care, landscape design, tree trimming, irrigation, and hardscaping. Free estimates available.',
  keywords:
    'landscaping, lawn care, lawn mowing, landscape design, tree trimming, hardscaping, irrigation, seasonal cleanup',
  openGraph: {
    title: 'Green Horizon Landscaping',
    description: 'Professional landscaping services for your home or business. Get a free estimate today.',
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
