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
        
        {/* Favicon básico */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Para dispositivos Apple */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Favicons en diferentes tamaños */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Para PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Color de la barra de estado en móviles */}
        <meta name="theme-color" content="#99582A" />
        
        {/* Para Safari en MacOS */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#99582A" />
        
        {/* Para Windows */}
        <meta name="msapplication-TileColor" content="#99582A" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
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
