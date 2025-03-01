'use client'

import { useState } from "react";

export default function VideoARSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "qvFnf2EEd20";

  return (
    <section className="bg-[#FFFBF0] py-16 md:py-24 relative overflow-hidden">
      {/* Título y descripción */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-[#432818] mb-4">
          Video
        </h2>
        <p className="text-lg md:text-xl text-[#432818] uppercase tracking-wider">
          VIDEO PUBLICITARIO AR
        </p>
      </div>

      {/* Contenedor del video */}
      <div className="container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          {/* Overlay para el efecto de curva en las esquinas */}
          <div className="absolute inset-0 rounded-3xl border-8 border-[#FFFBF0] z-10" />
          
          {/* Contenedor del video */}
          <div className="relative aspect-video">
            <iframe
              width="100%"
              height="100%"
              // TODO: Cambiar a la url del video
              src={`https://www.youtube.com/embed/${videoId}${isPlaying ? '?autoplay=1' : ''}`}
              title="Video Publicitario AR"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            
            {/* Botón de reproducción (visible solo cuando el video no está reproduciéndose) */}
            {!isPlaying && (
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full flex items-center justify-center z-20
                  transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Reproducir video"
              >
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#432818] border-b-[12px] border-b-transparent ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-300/20 rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
