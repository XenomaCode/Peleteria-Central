import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

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
        <header className="bg-amber-800 text-white py-4 sticky top-0 z-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif">
              Peletería Central
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="font-medium hover:text-amber-300 transition-colors">
                INICIO
              </Link>
              <Link href="/nosotros" className="font-medium hover:text-amber-300 transition-colors">
                Nosotros
              </Link>
              <Link href="/productos" className="font-medium hover:text-amber-300 transition-colors">
                Productos
              </Link>
              <Link href="/contacto" className="font-medium hover:text-amber-300 transition-colors">
                Contacto
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-amber-700 text-white rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              <Link href="/carrito" className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-amber-300 text-amber-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-amber-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-serif mb-4">Peletería Central</h3>
                <p>Tu proveedor de confianza en materiales para calzado y marroquinería desde hace más de 20 años.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif mb-4">Enlaces</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-amber-300 transition-colors">Inicio</Link></li>
                  <li><Link href="/nosotros" className="hover:text-amber-300 transition-colors">Nosotros</Link></li>
                  <li><Link href="/productos" className="hover:text-amber-300 transition-colors">Productos</Link></li>
                  <li><Link href="/contacto" className="hover:text-amber-300 transition-colors">Contacto</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-serif mb-4">Contacto</h3>
                <address className="not-italic">
                  <p>Calle Ejemplo 123</p>
                  <p>Ciudad, CP 12345</p>
                  <p>Tel: (123) 456-7890</p>
                  <p>Email: info@peleteriacentral.com</p>
                </address>
              </div>
            </div>
            
            <div className="border-t border-amber-700 mt-8 pt-8 text-center">
              <p>&copy; {new Date().getFullYear()} Peletería Central. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
