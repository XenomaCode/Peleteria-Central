'use client'

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1C1917] text-white">
        {/* Sección superior: Foto y Ubicación */}
        <div className="grid md:grid-cols-2">
          {/* Foto de materiales */}
          <div className="relative">
            <Image
              src="/landing-images/rollo_foote.png"
              alt="Materiales de cuero"
              fill
              className="object-cover"
            />
          </div>

          {/* Ubicación */}
          <div className="p-12 bg-[#1C1917]">
            <h2 className="text-4xl font-serif mb-8 text-center">Ubicación</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2 mb-6 md:mb-0 text-center">
                <p className="text-xl">Av. Central 1031,</p>
                <p className="text-xl">Col. Guadalupe.</p>
                <p className="text-xl">León, Guanajuato,</p>
                <p className="text-xl">México.</p>
              </div>
              {/* Mapa de Google */}
              <div className="rounded-2xl overflow-hidden h-[200px] md:h-[350px] w-full md:w-[350px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.1902373213416!2d-101.6944249!3d21.1049805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbf9abb14118f%3A0x8f97979a2841738b!2sPeleteria%20Central!5e0!3m2!1sen!2smx!4v1740810688214!5m2!1sen!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior: Información y enlaces */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo */}
            
            <div>
              <Image
                src="/peleteria_logo_con_color.svg"
                alt="Peletería Central"
                width={300}
                height={300}
                className="mb-6 mx-auto"
              />
              <br />
              <br />
              <div className="flex justify-center space-x-4">
                <Link href="https://facebook.com" target="_blank" className="hover:text-amber-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Link>
                <Link href="https://instagram.com" target="_blank" className="hover:text-amber-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link href="https://youtube.com" target="_blank" className="hover:text-amber-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </Link>
                <Link href="https://twitter.com" target="_blank" className="hover:text-amber-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
              </div>
            </div>

          {/* Páginas */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">PÁGINAS</h3>
            <ul className="space-y-2">
              <li className="text-center"><Link href="/" className="hover:text-amber-300 transition-colors">Inicio</Link></li>
              <li className="text-center"><Link href="/nosotros" className="hover:text-amber-300 transition-colors">Nosotros</Link></li>
              <li className="text-center"><Link href="/producto" className="hover:text-amber-300 transition-colors">Producto</Link></li>
              <li className="text-center"><Link href="/contacto" className="hover:text-amber-300 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">CONTACTO</h3>
            <ul className="space-y-2">
              <li className="text-center">
                <span className="block">Correo:</span>
                <a href="mailto:contacto@peleteriacentral.com" className="text-amber-300 hover:text-amber-400 transition-colors">
                  contacto@peleteriacentral.com
                </a>
              </li>
              <li className="text-center">
                <span className="block">Teléfonos:</span>
                <p>Oficina: 477 761 6263</p>
                <p>Celular: 477 638 1625</p>
              </li>
            </ul>
          </div>

          {/* Desarrollado por */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">DESARROLLADO POR</h3>
            <div 
              className="relative group cursor-pointer mx-auto w-fit"
              onClick={() => window.open('https://xenomacode.com', '_blank')}
              onKeyDown={(e) => e.key === 'Enter' && window.open('https://xenomacode.com', '_blank')}
              tabIndex={0}
              role="link"
              aria-label="Visitar sitio web de Xenoma Code"
            >
              <Image
                src="/landing-images/xenoma_code_white.png"
                alt="Xenoma Code"
                width={180}
                height={60}
                className="mx-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-150 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)_,_0_0_30px_rgba(99,102,241,0.4)_,_0_0_45px_rgba(67,56,202,0.3)] animate-pulse"
                loading="lazy"
                title="Xenoma Code"
              />
              <div className="absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/20 via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © 2025 Peletería Central. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
