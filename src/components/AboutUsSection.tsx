'use client'

import Image from "next/image";

export default function AboutUsSection() {
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
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-12 text-center">
          Sobre nosotros
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagen del Arco */}
          <div className="relative order-1 md:order-1">
            <div className="mb-4 md:mb-0">
              <Image
                src="/landing-images/leon_gto.png"
                alt="Molde de zapato"
                width={700}
                height={500}
                className="rounded-lg -translate-x-0 md:-translate-x-16 lg:-translate-x-20"
              />
            </div>
          </div>

          {/* Decoración de comillas */}
          <div className="relative order-2 md:absolute md:-right-8 md:top-8 flex justify-center md:justify-start mb-8 md:mb-0">
            <Image 
              src="comillas.svg" 
              alt="Quote Left" 
              width={100} 
              height={100} 
              className="opacity-80"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="text-white space-y-6 order-3 md:order-2">
            <p className="text-lg md:text-xl leading-relaxed">
              Peletería Central, con sede en León, Guanajuato, es una empresa con más de 10 años 
              en el mercado y más de 25 años de experiencia en la industria. Nos destacamos por 
              nuestra formalidad en la entrega de pedidos, amplio conocimiento del mercado y el 
              respaldo de proveedores líderes.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Ofrecemos insumos de alta calidad para calzado y marroquinería, garantizando 
              confianza y excelencia en cada producto.
            </p>
          </div>
        </div>
      </div>

      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-300/20 rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
