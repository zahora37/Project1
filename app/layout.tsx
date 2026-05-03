import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wild Roots Custom Landscaping | Arizona Landscaping Experts',
  description: 'Arizona-licensed landscaping professionals. Artificial turf, pavers, irrigation, weed management & more. Licensed, insured, and certified. ROC #357770.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'Wild Roots Custom Landscaping',
    description: 'Arizona-certified landscaping experts. Artificial turf, pavers, irrigation & more. Free estimates. ROC #357770.',
    url: 'https://wildrootscustom.com',
    siteName: 'Wild Roots Custom Landscaping',
    images: [{ url: '/logo.png' }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
