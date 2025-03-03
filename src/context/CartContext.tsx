'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { database } from '@/firebase/config'
import { ref, push, serverTimestamp } from 'firebase/database'

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

interface CartItem {
  id: string
  name: string
  price?: number
  quantity: number
  category: string
  images: string[]
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: any, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemsCount: number
  total: number
  hasItemsWithoutPrice: boolean
  finalizePurchase: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Cargar items del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Guardar items en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const addItem = (product: any, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id)
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...currentItems, { ...product, quantity }]
    })
    openCart() // Abrimos el carrito automáticamente al agregar un item
  }

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('cart')
    closeCart()
  }

  const itemsCount = items.reduce((total, item) => total + item.quantity, 0)
  
  const total = items.reduce((total, item) => {
    if (item.price) {
      return total + item.price * item.quantity
    }
    return total
  }, 0)

  const hasItemsWithoutPrice = items.some(item => !item.price)

  const generateWhatsAppMessage = () => {
    let message = "*NUEVO PEDIDO*\n\n"
    
    items.forEach(item => {
      message += `• ${item.quantity} ${item.name}\n`
    })

    

    return message
  }

  const savePurchaseToDatabase = async () => {
    try {
      const purchaseRef = ref(database, 'purchases')
      await push(purchaseRef, {
        items,
        total,
        hasItemsWithoutPrice,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.error('Error saving purchase:', error)
    }
  }

  const finalizePurchase = async () => {
    const phoneNumber = '524772275165'
    const message = generateWhatsAppMessage()
    
    // Detectar si es iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    
    // Usar formato diferente para iOS
    const whatsappUrl = isIOS
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    // Guardar en la base de datos
    await savePurchaseToDatabase()
    
    // Abrir WhatsApp
    window.location.href = whatsappUrl
    
    // Limpiar el carrito y cerrarlo
    clearCart()
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemsCount,
    total,
    hasItemsWithoutPrice,
    finalizePurchase,
    isCartOpen,
    openCart,
    closeCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 