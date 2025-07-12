import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wingman AI - Your AI Conversation Partner',
  description: 'A modern AI chat application with support for multiple language models via OpenRouter',
  keywords: ['AI', 'chat', 'OpenRouter', 'LLM', 'conversation'],
  authors: [{ name: 'Wingman AI' }],
  viewport: 'width=device-width, initial-scale=1',
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