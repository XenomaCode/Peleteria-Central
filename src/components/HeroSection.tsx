'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "./modals/ContactModal";

export default function HeroSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/landing-images/background_cover.png" 
          alt="Materiales de calzado" 
          fill 
          className="object-cover object-center sm:object-center md:object-right-top"
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1200px) 80vw,
                 (max-width: 400px) 60vw,
                 100vw"
          style={{
            objectPosition: 'center 20%'
          }}
          priority
        />
      </div>
      
      <div className="absolute inset-0 z-10">
        <Image 
          src="/background_degrad.svg"
          alt="Overlay gradient"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-3 sm:mb-4 md:mb-6 leading-tight lg:leading-normal text-center sm:text-left" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>
              Adquiere los mejores materiales para <span className="text-amber-300 font-bold">calzado</span>
            </h1>
            
            <p className="hidden sm:block text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-prose" style={{ fontSize: 'clamp(0.1rem, 5vw, 1.2rem)' }}>
              Descubre nuestra selección de insumos de alta calidad para la industria 
              del calzado y marroquinería. Ofrecemos una amplia gama de materiales, 
              desde sintéticos textil, hasta materiales esenciales, diseñados para 
              satisfacer las necesidades más exigentes.
              Con años de experiencia en el sector, nos enorgullecemos de ser el socio 
              confiable para tu negocio, brindando productos que combinan durabilidad, 
              estilo y funcionalidad.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-center items-center mt-4 sm:mt-6 md:mt-0">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-amber-300 text-amber-900 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl sm:rounded-2xl hover:bg-amber-400 transition-colors text-base sm:text-lg uppercase w-70 sm:w-70"
            >
              CONTACTO
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute left-0 right-0 z-20">
        <div className="relative">
          
          <div className="absolute left-1/2 bottom-4 sm:bottom-8 transform -translate-x-1/2">
            <div className="bg-[#6F1D1B] rounded-full p-1.5 xs:p-2 sm:p-3 animate-bounce shadow-lg h-12 xs:h-16 sm:h-20">
              <svg className="w-6 h-6 xs:w-4 sm:w-6 sm:h-6 text-white translate-y-2 xs:translate-y-3 sm:translate-y-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="w-full">
          <Image 
            src="/broken_layer.svg"
            alt="Decorative wave"
            width={1362}
            height={80}
            className="w-full translate-y-4 sm:translate-y-16 md:translate-y-20 lg:translate-y-13"
            priority
          />
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
} 