import Image from "next/image";

export default function EspecializacionSection() {
  return (
    <section className="py-16 bg-[#FFFBF0]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Image
              src="/landing-images/materiales.png"
              alt="Molde de zapato"
              width={700}
              height={500}
              className="rounded-lg -translate-x-0 md:-translate-x-16 lg:-translate-x-20"
            />
          </div>
          <div className="order-1 md:order-2 lg:pr-25 md:pr-0 sm:pr-0 xs:pr-0">
            <h2 className="text-5xl font-serif text-[#432818] mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              Nos especializamos en la comercialización de una amplia variedad de insumos para la industria del calzado y marroquinería.
            </h2>
            <br />
            <p className="text-black mb-6 leading-relaxed text-xl" style={{ fontSize: 'clamp(0.1rem, 5vw, 1.2rem)' }}>
              En Peletería Central, ofrecemos materiales de máxima calidad a buen precio, 
              seleccionados por su durabilidad, resistencia y acabado excepcional. 
              Trabajamos con proveedores confiables y procesos rigurosos para garantizar 
              que cada producto supere tus expectativas, respaldando el éxito de tus creaciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 