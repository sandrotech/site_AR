import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Ana Risorlange Supermercado | Trazendo o melhor para você',
  description: 'Supermercado Ana Risorlange - Ofertas incríveis, produtos frescos e atendimento de qualidade em Fortaleza. Visite nossas lojas no Bom Jardim e Bonsucesso.',
  keywords: 'supermercado, fortaleza, ofertas, promoções, ana risorlange, bom jardim, bonsucesso',
}

export const viewport: Viewport = {
  themeColor: '#003882',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
