'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "font-bold text-white uppercase relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-8 after:w-[15px] after:h-[22px] after:bg-[url('/select_header.svg')] after:bg-no-repeat after:bg-contain" : "font-medium hover:text-amber-300 transition-colors"
  }

  return (
    <nav className="hidden md:flex space-x-8">
      <Link href="/" className={isActive('/')}>
        Inicio
      </Link>
      <Link href="/nosotros" className={isActive('/nosotros')}>
        Nosotros
      </Link>
      <Link href="/productos" className={isActive('/productos')}>
        Productos
      </Link>
      <Link href="/contacto" className={isActive('/contacto')}>
        Contacto
      </Link>
    </nav>
  )
}

export default function Header() {
  return (
    <header className="bg-[#99582A] text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif">
          Peletería Central
        </Link>
        
        <Navigation />
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-[#FFE6A7] text-[#99582A] placeholder:text-[#99582A] rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg 
                className="w-7 h-7 stroke-[#99582A] hover:stroke-[#99582A]/80" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </div>
          
          <Link href="/carrito" className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-amber-300 text-amber-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
} 