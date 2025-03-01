'use client'

import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const bestSellers = [
  {
    id: 1,
    name: "Machito blanco refri",
    description: "Forro sintético machito color blanco refri.",
    image: "/landing-images/machito_blanco_refri.jpg",
  },
  {
    id: 2,
    name: "Dusel DAL-60",
    description: "Adhesivo de poliuretano base solvente. (PVC).",
    image: "/landing-images/dusel_fondo_blanco.png",
  },
  {
    id: 3,
    name: "Hilo de pespunte",
    description: "Hilo de pespunte, diferentes colores, calibres #00, #0, #8 y #30, marca Hernán, Gallo, San Rafael, Abaco y Troya.",
    image: "/landing-images/hilo_pespunte.png",
  },
  {
    id: 4,
    name: "Esponja",
    description: "Diferentes tipos de esponja, densidades y medidas, cuadros y láminas de esponja",
    image: "/landing-images/esponja.jpg",
  }
];

export default function BestSellingProducts() {
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
      prevIndex === bestSellers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? bestSellers.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-[#FFFBF0] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background_best_selling_product.svg"
            alt="Background"
            fill
            className="object-cover object-top scale-[1.5] origin-top"
            priority
          />
        </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 translate-y-9">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Productos más vendidos
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Descubre nuestros productos más vendidos, seleccionados por su calidad y confiabilidad.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto z-20">
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

          {/* Carrusel de productos */}
          <div {...handlers} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className={`transform transition-all duration-500 ${
                  index === currentIndex ? 'scale-100 opacity-100' : 'md:scale-95 md:opacity-70 hidden md:block'
                }`}
              >
                <div className="bg-[#FFE6A7] rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative h-48 md:h-56">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-serif text-[#432818] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de navegación móvil */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {bestSellers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-300 w-6' 
                    : 'bg-amber-300/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Texto indicador de deslizamiento (solo visible en móvil) */}
          <p className="text-center text-white/70 text-sm mt-4 md:hidden">
            Desliza para ver más productos
          </p>
        </div>
      </div>
    </section>
  );
}
