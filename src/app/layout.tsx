import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Peletería Central - Materiales para Calzado y Marroquinería',
  description: 'Descubre nuestra selección de insumos de alta calidad para la industria del calzado y marroquinería.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        
        
      </body>
    </html>
  )
}
