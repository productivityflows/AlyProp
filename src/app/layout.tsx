import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlyProp - AI-Powered Real Estate Deal Finder',
  description: 'Discover undervalued properties with AI-powered insights, comprehensive market data, and investment analysis tools.',
  keywords: [
    'real estate',
    'property investment',
    'AI analysis',
    'deal finder',
    'property data',
    'investment tools',
    'market analysis'
  ],
  authors: [{ name: 'AlyProp Team' }],
  creator: 'AlyProp',
  publisher: 'AlyProp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alyprop.com',
    title: 'AlyProp - AI-Powered Real Estate Deal Finder',
    description: 'Discover undervalued properties with AI-powered insights and comprehensive market data.',
    siteName: 'AlyProp',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AlyProp - AI-Powered Real Estate Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlyProp - AI-Powered Real Estate Deal Finder',
    description: 'Discover undervalued properties with AI-powered insights and comprehensive market data.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div id="root" className="min-h-full">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}