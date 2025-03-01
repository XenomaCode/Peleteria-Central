'use client'

import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const categories = [
  {
    id: 1,
    name: "Sintéticos",
    image: "/landing-images/cat_sintetico.jpg",
  },
  {
    id: 2,
    name: "Pegamentos",
    image: "/landing-images/cat_pegamento.jpg",
  },
  {
    id: 3,
    name: "Hilos",
    image: "/landing-images/cat_hilos.png",
  },
];

export default function CategoriesSection() {
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
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-[#FFFBF0] py-16 md:py-24 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300 rounded-full -translate-y-1/2 translate-x-1/2 opacity-80" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-300 rounded-full translate-y-1/2 -translate-x-1/2 opacity-80" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#432818] mb-6">
            Categorías
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Encuentra más fácil tus productos, explorando las diversas categorías.
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

          {/* Carrusel de categorías */}
          <div {...handlers} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`transform transition-all duration-500 ${
                  index === currentIndex ? 'scale-100 opacity-100' : 'md:scale-95 md:opacity-70 hidden md:block'
                }`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative h-64 md:h-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm uppercase tracking-wider mb-2">CATEGORÍA</p>
                      <h3 className="text-2xl md:text-3xl font-serif">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de navegación móvil */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {categories.map((_, index) => (
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
            Desliza para ver más categorías
          </p>
        </div>
      </div>
    </section>
  );
}
