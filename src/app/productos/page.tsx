'use client'

import { useState, useEffect } from 'react'
import { database } from '@/firebase/config'
import { ref, get } from 'firebase/database'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ProductDetailModal from '@/components/modals/ProductDetailModal'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  images: string[]
  stock: number
  status: 'active' | 'inactive'
}

interface Category {
  id: string
  name: string
  description: string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Todos los productos')
  
  // Estado solo para el modal de detalles
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Usar el contexto del carrito
  const { addItem } = useCart()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRef = ref(database, 'products')
        const categoriesRef = ref(database, 'categories')
        
        const [productsSnapshot, categoriesSnapshot] = await Promise.all([
          get(productsRef),
          get(categoriesRef)
        ])

        if (productsSnapshot.exists()) {
          const productsData = Object.entries(productsSnapshot.val()).map(([id, data]: [string, any]) => ({
            id,
            ...data
          }))
          setProducts(productsData)
          
          // Establecer el rango de precios basado en los productos reales
          const prices = productsData.map(p => p.price)
          setPriceRange({
            min: Math.min(...prices).toString(),
            max: Math.max(...prices).toString()
          })
        }

        if (categoriesSnapshot.exists()) {
          const categoriesData = Object.entries(categoriesSnapshot.val()).map(([id, data]: [string, any]) => ({
            id,
            ...data
          }))
          setCategories(categoriesData)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseFloat(priceRange.max))
      const isActive = product.status === 'active'

      return matchesCategory && matchesSearch && matchesPrice && isActive
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Precio: Bajo a Alto':
          return a.price - b.price
        case 'Precio: Alto a Bajo':
          return b.price - a.price
        case 'Más recientes':
          //@ts-ignore
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Botón para mostrar filtros en móvil */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-xl border border-amber-200 text-[#99582A] hover:bg-amber-50/50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {isSidebarOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar con nuevo diseño */}
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 lg:flex-shrink-0`}>
            <div className="lg:sticky lg:top-24 bg-white rounded-3xl shadow-lg shadow-amber-100/50 p-6 border border-amber-100">
              {/* Categorías */}
              <div className="mb-8">
                <h2 className="text-xl font-serif text-[#99582A] mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  CATEGORÍAS
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all"
                      name="category"
                      className="appearance-none w-4 h-4 rounded-full border border-amber-300 checked:border-amber-500 checked:bg-amber-500 checked:border-4 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                    />
                    <label htmlFor="all" className="ml-2 text-sm text-gray-700 flex-1 hover:text-[#99582A] transition-colors cursor-pointer">
                      Todas las categorías
                    </label>
                  </div>
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={category.id}
                        name="category"
                        className="appearance-none w-4 h-4 rounded-full border border-amber-300 checked:border-amber-500 checked:bg-amber-500 checked:border-4 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                      />
                      <label htmlFor={category.id} className="ml-2 text-sm text-gray-700 flex-1 hover:text-[#99582A] transition-colors cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rango de precios */}
              <div className="mb-8">
                <h2 className="text-xl font-serif text-[#99582A] mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  RANGO DE PRECIOS
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full pl-8 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#99582A]/20 focus:border-[#99582A] transition-all text-black"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">$</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full pl-8 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#99582A]/20 focus:border-[#99582A] transition-all text-black"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">$</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de búsqueda y filtros */}
            <div className="bg-white rounded-3xl shadow-lg shadow-amber-100/50 p-6 border border-amber-100 mb-8 text-black">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-12 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#99582A]/20 focus:border-[#99582A] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Ordenar por:</span>
                  <select
                    className="w-full md:w-auto pl-4 pr-8 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#99582A]/20 focus:border-[#99582A] transition-all"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Todos los productos</option>
                    <option>Más recientes</option>
                    <option>Precio: Bajo a Alto</option>
                    <option>Precio: Alto a Bajo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-xl sm:rounded-3xl shadow-lg shadow-amber-100/50 overflow-hidden border border-amber-100 hover:shadow-xl hover:shadow-amber-200/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative">
                    {product.stock <= 5 && (
                      <span className="absolute top-1 right-1 sm:top-4 sm:right-4 bg-red-500 text-white px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-sm font-medium shadow-lg z-10">
                        ¡Últimas!
                      </span>
                    )}
                    <div
                      className="relative h-32 sm:h-48 md:h-64 overflow-hidden cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsDetailModalOpen(true)
                      }}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 md:p-6">
                    <h3
                      className="text-sm sm:text-lg font-medium text-gray-900 group-hover:text-[#99582A] transition-colors cursor-pointer line-clamp-1"
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsDetailModalOpen(true)
                      }}
                    >
                      {product.name}
                    </h3>
                    <p className="mt-0.5 sm:mt-2 text-[10px] sm:text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-1.5 sm:mt-4 flex items-center justify-between">
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-[#99582A]">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product)
                            setIsDetailModalOpen(true)
                          }}
                          className="p-1 sm:p-2 text-gray-600 hover:text-[#99582A] hover:bg-amber-50 rounded-lg sm:rounded-xl transition-colors"
                        >
                          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => addItem({ ...product, category: categories.find(cat => cat.id === product.categoryId)?.name || 'Sin categoría' }, 1)}
                          className="p-1 sm:p-2 text-white bg-[#99582A] hover:bg-[#99582A]/90 rounded-lg sm:rounded-xl transition-colors shadow-lg shadow-[#99582A]/30"
                        >
                          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 sm:mt-3 pt-1 sm:pt-3 border-t border-amber-100">
                      <span className="text-[10px] sm:text-sm text-gray-500">
                        Stock: {product.stock} unidades
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-lg shadow-amber-100/50 p-8 text-center border border-amber-100"
              >
                <svg
                  className="mx-auto h-16 w-16 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No se encontraron productos
                </h3>
                <p className="mt-2 text-gray-500">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchTerm('')
                    setPriceRange({ min: '', max: '' })
                  }}
                  className="mt-6 px-6 py-2 bg-[#99582A] text-white rounded-xl hover:bg-[#99582A]/90 transition-colors shadow-lg shadow-[#99582A]/30"
                >
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      <ProductDetailModal
        product={selectedProduct ? {
          id: selectedProduct.id,
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          images: selectedProduct.images,
          stock: selectedProduct.stock,
          status: selectedProduct.status,
          category: categories.find(cat => cat.id === selectedProduct.categoryId)?.name || 'Sin categoría'
        } : null}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCart={addItem}
      />
    </div>
  )
} 