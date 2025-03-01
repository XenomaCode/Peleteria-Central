'use client'

import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const brands = [
  {
    id: 1,
    name: "Polimeros y derivados",
    image: "/landing-images/polimeros.png",
  },
  {
    id: 2,
    name: "IVRA Sintéticos",
    image: "/landing-images/IVRA_LOGO.png",
  },
  {
    id: 3,
    name: "INDUX",
    image: "/landing-images/indux.png",
  },
  // Puedes agregar más marcas aquí
];

export default function BrandsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackTouch: true,
    trackMouse: true,
    delta: 10,
    preventScrollOnSwipe: true
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === brands.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? brands.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-[#FFFBF0] py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#432818] mb-6">
            Distribuidores de las mejores marcas
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Somos distribuidores de las mejores marcas en insumos para calzado y marroquinería.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Botones de navegación (solo desktop) */}
          <button 
            onClick={prevSlide}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-amber-300 hover:bg-amber-400 transition-colors rounded-2xl p-4 shadow-lg -translate-x-1/2"
          >
            <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-amber-300 hover:bg-amber-400 transition-colors rounded-2xl p-4 shadow-lg translate-x-1/2"
          >
            <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carrusel de marcas */}
          <div {...handlers} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className={`transform transition-all duration-500 ${
                  index === currentIndex ? 'scale-100 opacity-100' : 'md:scale-95 md:opacity-70 hidden md:block'
                }`}
              >
                <div className="bg-[#FFF8E7] rounded-2xl overflow-hidden shadow-lg p-8 h-48 flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={300}
                    height={100}
                    className="object-contain max-h-32"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de navegación móvil */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {brands.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-500 w-6' 
                    : 'bg-amber-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Texto indicador de deslizamiento (solo visible en móvil) */}
          <p className="text-center text-gray-500 text-sm mt-4 md:hidden">
            Desliza para ver más marcas
          </p>
        </div>
      </div>
    </section>
  );
}
