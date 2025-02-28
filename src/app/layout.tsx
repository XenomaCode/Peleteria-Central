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
