import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Algonquin Pet Store - Admin',
  description: 'Admin portal for managing pet store operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

