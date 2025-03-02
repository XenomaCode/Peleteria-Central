'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.includes('/login');

  return (
    <html lang="es">
      <head>
        <title>Peletería Central - Materiales para Calzado y Marroquinería</title>
        <meta name="description" content="Descubre nuestra selección de insumos de alta calidad para la industria del calzado y marroquinería." />
      </head>
      <body className={inter.className}>
        {!isLoginPage && <Header />}
        {children}
        {!isLoginPage && <Footer />}
      </body>
    </html>
  )
}
