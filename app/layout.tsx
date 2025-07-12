import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wingman AI - Your AI Dating Coach & Reply Generator',
  description: 'Get personalized dating advice, conversation starters, and relationship strategies from your AI wingman. Learn how to attract, connect, and build meaningful relationships.',
  keywords: ['dating', 'relationships', 'dating coach', 'AI wingman', 'attraction', 'confidence', 'OpenRouter'],
  authors: [{ name: 'Wingman AI' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 