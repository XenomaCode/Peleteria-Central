'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import { CartProvider } from '@/context/CartContext'
import Cart from '@/components/Cart'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminOrLogin = pathname?.includes('/admin') || pathname?.includes('/login');

  return (
    <html lang="es">
      <head>
        <title>Peletería Central - Materiales para Calzado y Marroquinería</title>
        <meta name="description" content="Descubre nuestra selección de insumos de alta calidad para la industria del calzado y marroquinería." />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {!isAdminOrLogin && <Header />}
          {children}
          {!isAdminOrLogin && <Footer />}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
