import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PropertyAI Pro - AI-Powered Real Estate Investment Analysis',
  description: 'Get deep AI insights on any property nationwide. $5 pay-as-you-go analysis with ROI calculations, market context, and investment strategies.',
  keywords: 'real estate, investment, AI analysis, property data, ROI calculator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}