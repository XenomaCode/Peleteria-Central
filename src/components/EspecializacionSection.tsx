import Image from "next/image";

export default function EspecializacionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Image
              src="/landing-images/materiales.png"
              alt="Molde de zapato"
              width={600}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-serif text-amber-900 mb-6">
              Nos especializamos en la comercialización de una amplia variedad de insumos para la industria del calzado y marroquinería.
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
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