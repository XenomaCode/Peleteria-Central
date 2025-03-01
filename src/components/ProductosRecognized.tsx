import Image from "next/image";
import Link from "next/link";

export default function ProductosRecognized() {
  return (
    <section className="text-white relative overflow-hidden bg-[#FFFBF0]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background_productos_recognized.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
          

          {/* Contenedor de imágenes para tablet/desktop */}
          <div className="relative hidden md:block">
            <Image
              src="/landing-images/hilo_jareta.png"
              alt="Hilos de alta calidad"
              width={600}
              height={400}
              className="rounded-lg -translate-x-0 md:-translate-x-16 lg:-translate-x-20 -translate-y-10 md:-translate-y-20 lg:translate-y-29 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] hover:brightness-105 transition-all duration-300"
            />
            <Image
              src="/landing-images/lider_pvc.png"
              alt="Pegamento Liderz"
              width={400}
              height={500}
              className="absolute -bottom-10 right-0 rounded-lg object-contain transform translate-x-20 md:translate-x-32 lg:translate-x-210 -translate-y-10 md:-translate-y-20 lg:translate-y-38 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] hover:brightness-105 transition-all duration-300"
            />
          </div>

          {/* Columna Derecha - Texto */}
          <div className="space-y-6 text-center md:text-left md:pl-8 md:translate-y-20 lg:-translate-y-5 lg:-translate-x-40">
            <h2 className="text-5xl font-serif text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              Venta productos reconocidos y de alta calidad.
            </h2>
            
            <p className="text-white mb-6 leading-relaxed text-xl" style={{ fontSize: 'clamp(0.1rem, 5vw, 1.2rem)' }}>
              Nuestros insumos, seleccionados por su excelencia y durabilidad,
              garantizan resultados superiores en cada proyecto. Respalda tus
              creaciones con estándares profesionales.
            </p>

            <Link href="/catalogo">
              <button className="bg-amber-300 text-amber-900 font-bold py-3 px-8 rounded-xl hover:bg-amber-400 transition-colors text-lg uppercase">
                CATÁLOGO
              </button>
            </Link>
          </div>

          {/* Contenedor de imágenes para móvil */}
          <div className="block md:hidden w-full">
            <div className="flex justify-center items-center gap-4">
              <div className="w-1/2 max-w-[200px]">
                <Image
                  src="/landing-images/hilo_jareta.png"
                  alt="Hilos de alta calidad"
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] hover:brightness-105 transition-all duration-300"
                />
              </div>
              <div className="w-1/2 max-w-[150px]">
                <Image
                  src="/landing-images/lider_pvc.png"
                  alt="Pegamento Liderz"
                  width={400}
                  height={500}
                  className="rounded-lg w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] hover:brightness-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="text-white relative overflow-hidden bg-[#FFFBF0]">
        <br />
        </section>
    </section>
  );
}
