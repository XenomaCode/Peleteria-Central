import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price?: number
  category: string
  images: string[]
  stock?: number
  status: 'active' | 'inactive'
}

export default function Cart() {
  const { 
    items, 
    isCartOpen: isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem,
    total,
    clearCart,
    hasItemsWithoutPrice,
    finalizePurchase
  } = useCart()

  // Función auxiliar para formatear precios
  const formatPrice = (price?: number) => {
    return typeof price === 'number' ? price.toFixed(2) : 'Consultar'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-gray-900 flex items-center gap-3">
                <svg className="w-6 h-6 text-[#99582A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Tu Pedido
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {!items?.length ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-[#99582A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500">¡Agrega algunos productos para comenzar!</p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2 bg-[#99582A] text-white rounded-xl hover:bg-[#99582A]/90 transition-colors shadow-lg shadow-[#99582A]/30"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-200"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-[#99582A] font-medium">
                          {item.price ? `$${formatPrice(item.price)}` : 'Precio a consultar'}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center border border-gray-200 rounded-lg text-black">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="p-1 text-gray-600 hover:text-[#99582A] transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-600 hover:text-[#99582A] transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-200 p-6 space-y-4">
                  {total > 0 && (
                    <div className="flex items-center justify-between text-lg font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-[#99582A]">${formatPrice(total)}</span>
                    </div>
                  )}
                  {hasItemsWithoutPrice && (
                    <p className="text-amber-600 text-sm">
                      * Algunos productos requieren consulta de precio
                    </p>
                  )}
                  <button 
                    onClick={finalizePurchase}
                    className="w-full bg-[#99582A] text-white px-8 py-3 rounded-xl hover:bg-[#99582A]/90 transition-colors shadow-lg shadow-[#99582A]/30 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Finalizar pedido
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full text-gray-500 hover:text-gray-700 transition-colors text-center"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 