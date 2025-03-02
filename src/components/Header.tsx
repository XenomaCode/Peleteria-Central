'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { auth } from '@/firebase/config'
import ContactModal from './modals/ContactModal'
import { useCart } from '@/context/CartContext'
import Cart from './Cart'

function Navigation({ onContactClick }: { onContactClick: () => void }) {
  const pathname = usePathname()

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us-section')
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' })
    } else if (pathname !== '/') {
      window.location.href = '/#about-us-section'
    }
  }

  const isActive = (path: string) => {
    return pathname === path ? "font-bold text-white uppercase relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-8 after:w-[15px] after:h-[22px] after:bg-[url('/select_header.svg')] after:bg-no-repeat after:bg-contain text-[12px] xs:text-sm sm:text-base" : "font-medium hover:text-amber-300 transition-colors text-[12px] xs:text-sm sm:text-base"
  }

  return (
    <nav className="hidden md:flex space-x-4 xs:space-x-6 sm:space-x-8">
      <Link href="/" className={isActive('/')}>
        Inicio
      </Link>
      <button 
        onClick={scrollToAboutUs}
        className="font-medium hover:text-amber-300 transition-colors text-[12px] xs:text-sm sm:text-base"
      >
        Nosotros
      </button>
      <Link href="/productos" className={isActive('/productos')}>
        Productos
      </Link>
      <button
        onClick={onContactClick}
        className="font-medium hover:text-amber-300 transition-colors text-[12px] xs:text-sm sm:text-base"
      >
        Contacto
      </button>
    </nav>
  )
}

function MobileMenu({ isOpen, onClose, onContactClick }: { isOpen: boolean; onClose: () => void; onContactClick: () => void }) {
  const pathname = usePathname()

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us-section')
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' })
      onClose() // Cerrar el menú móvil después de hacer clic
    } else if (pathname !== '/') {
      window.location.href = '/#about-us-section'
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden bg-gradient-to-r from-[#99582A]/80 via-[#432818]/100 to-transparent backdrop-blur-sm" 
          onClick={onClose}
        />
      )}
      {/* Menú */}
      <div className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-[#99582A] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl`}>
        <div className="p-6">
          <div className="text-2xl font-serif text-amber-300 mb-8 text-center border-b border-amber-400 pb-4">
            <Image src="/peleteria_logo_con_color.svg" alt="Peletería Central" width={200} height={200} />
          </div>
          <div className="flex flex-col space-y-6">
            <Link href="/" 
              className={`${pathname === '/' ? 'text-amber-300' : 'text-white'} hover:text-amber-300 transition-colors text-lg flex items-center gap-3`}
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </Link>
            <button
              onClick={scrollToAboutUs}
              className="text-white hover:text-amber-300 transition-colors text-lg flex items-center gap-3 text-left w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Nosotros
            </button>
            <Link href="/productos" 
              className={`${pathname === '/productos' ? 'text-amber-300' : 'text-white'} hover:text-amber-300 transition-colors text-lg flex items-center gap-3`}
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Productos
            </Link>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="text-white hover:text-amber-300 transition-colors text-lg flex items-center gap-3 text-left w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacto
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const pathname = usePathname()
  const { itemsCount, openCart } = useCart()

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us-section')
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' })
    } else if (pathname !== '/') {
      // Si no estamos en la página principal, redirigir y luego scroll
      window.location.href = '/#about-us-section'
    }
  }

  return (
    <>
      <header className="bg-[#99582A] text-white py-2 xs:py-3 sm:py-4 sticky top-0 z-50">
        {/* Barra de búsqueda móvil */}
        <div className={`
          absolute top-0 left-0 right-0 bg-[#99582A] transform transition-all duration-300 ease-in-out
          ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          md:hidden
        `}>
          <div className="container mx-auto px-4 py-2 flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="flex-1 bg-[#FFE6A7] text-[#99582A] placeholder:text-[#99582A] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
              autoFocus={isSearchOpen}
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-white hover:text-amber-300 transition-colors"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-2 xs:px-3 sm:px-4 flex justify-between items-center">
          <div className={`flex items-center space-x-4 ${isSearchOpen ? 'md:flex hidden' : 'flex'}`}>
            <button 
              className="md:hidden z-50 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href="/" className="text-2xl font-serif">
              <Image 
                src="/peleteria_logo_con_color.svg" 
                alt="Peletería Central" 
                width={200} 
                height={60} 
                className="w-[120px] md:w-[160px] lg:w-[200px] h-auto"
                priority
              />
            </Link>
          </div>

          <Navigation onContactClick={() => setIsContactModalOpen(true)} />
          
          <div className={`flex items-center -translate-x-5 space-x-5 sm:space-x-4 ${isSearchOpen ? 'md:flex hidden' : 'flex'}`}>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="hidden md:block bg-[#FFE6A7] text-[#99582A] placeholder:text-[#99582A] rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button 
                className="md:hidden p-1.5"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-amber-300 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>
              <button className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg 
                  className="w-7 h-7 stroke-[#99582A] hover:stroke-[#99582A]/80" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
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
            
            <button 
              onClick={openCart}
              className="relative hover:text-[#99582A] transition-colors"
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemsCount > 0 && (
                <span 
                  className="absolute -top-1.5 -right-1.5 bg-amber-300 text-amber-900 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-bold"
                >
                  {itemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onContactClick={() => setIsContactModalOpen(true)}
        />
      </header>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  )
} 