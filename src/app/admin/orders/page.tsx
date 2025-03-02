'use client'

import { useState, useEffect } from 'react'
import { database } from '@/firebase/config'
import { ref, onValue, update } from 'firebase/database'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useSearchParams } from 'next/navigation'

interface Order {
  id: string
  items: {
    id: string
    name: string
    price?: number
    quantity: number
    category: string
    images: string[]
  }[]
  total: number
  hasItemsWithoutPrice: boolean
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: number
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<'all' | Order['status']>('all')
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')

  useEffect(() => {
    const ordersRef = ref(database, 'purchases')
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const ordersArray = Object.entries(data).map(([id, order]) => ({
          id,
          ...order as Omit<Order, 'id'>
        }))
        
        // Ordenar por fecha de creación (más recientes primero)
        const sortedOrders = ordersArray.sort((a, b) => b.createdAt - a.createdAt)
        setOrders(sortedOrders)

        // Si hay un ID en la URL, seleccionar ese pedido automáticamente
        if (orderId) {
          const specificOrder = sortedOrders.find(order => order.id === orderId)
          if (specificOrder) {
            setSelectedOrder(specificOrder)
            setFilter('all') // Resetear el filtro para asegurar que el pedido sea visible
          }
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [orderId])

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const orderRef = ref(database, `purchases/${orderId}`)
      await update(orderRef, { status: newStatus })
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  // Si hay un ID específico, filtrar solo ese pedido
  const displayOrders = orderId 
    ? filteredOrders.filter(order => order.id === orderId)
    : filteredOrders

  const getStatusCount = (status: Order['status'] | 'all') => {
    if (status === 'all') return orders.length
    return orders.filter(order => order.status === status).length
  }

  const statusColors = {
    pending: 'bg-gradient-to-r from-amber-400 to-amber-600',
    processing: 'bg-gradient-to-r from-blue-400 to-blue-600',
    completed: 'bg-gradient-to-r from-green-400 to-green-600',
    cancelled: 'bg-gradient-to-r from-red-400 to-red-600'
  }

  const statusIcons = {
    pending: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    processing: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    completed: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    cancelled: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }

  const statusLabels = {
    pending: 'Pendiente',
    processing: 'En proceso',
    completed: 'Completado',
    cancelled: 'Cancelado'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedidos</h1>
            <p className="text-gray-500">Gestiona y da seguimiento a los pedidos de tus clientes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-between ${
                filter === 'all'
                  ? 'bg-[#99582A] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-white/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Todos
              </span>
              <span className={`${filter === 'all' ? 'bg-white/20' : 'bg-gray-100'} text-xs px-2.5 py-1 rounded-lg font-bold`}>
                {getStatusCount('all')}
              </span>
            </button>

            {(['pending', 'processing', 'completed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-between ${
                  filter === status
                    ? `${statusColors[status]} text-white shadow-lg`
                    : 'bg-white text-gray-600 hover:bg-white/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  {statusIcons[status]}
                  {statusLabels[status]}
                </span>
                <span className={`${filter === status ? 'bg-white/20' : 'bg-gray-100'} text-xs px-2.5 py-1 rounded-lg font-bold`}>
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <AnimatePresence>
            {displayOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusColors[order.status]} text-white`}>
                        {statusIcons[order.status]}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Pedido #{order.id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {format(order.createdAt, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 ${statusColors[order.status]}`}>
                        {statusIcons[order.status]}
                        {statusLabels[order.status]}
                      </span>
                      <button
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedOrder?.id === order.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-100 mt-4 pt-4"
                      >
                        <div className="grid gap-4">
                          {order.items.map((item) => (
                            <div 
                              key={item.id} 
                              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shadow-inner">
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                                <div className="flex items-center gap-4 mt-1">
                                  <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                    </svg>
                                    Cantidad: {item.quantity}
                                  </p>
                                  {item.price && (
                                    <p className="text-sm font-medium text-[#99582A] flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      ${item.price.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {order.total > 0 && (
                          <div className="mt-6 p-4 rounded-xl bg-[#99582A]/5 border border-[#99582A]/10">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-700">Total del pedido</span>
                              <span className="text-xl font-medium text-[#99582A]">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}

                        {order.hasItemsWithoutPrice && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                            <p className="text-amber-700 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Algunos productos requieren consulta de precio
                            </p>
                          </div>
                        )}

                        <div className="mt-6 flex gap-3">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'processing')}
                                className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transform transition-all flex items-center justify-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Procesar pedido
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transform transition-all flex items-center justify-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar pedido
                              </button>
                            </>
                          )}
                          {order.status === 'processing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transform transition-all flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Marcar como completado
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {displayOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4 rounded-2xl bg-white border border-gray-200"
            >
              <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No hay pedidos {filter !== 'all' && `${statusLabels[filter]}`}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Los pedidos aparecerán aquí cuando los clientes realicen compras.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 