'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

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
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, quantity: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  itemsCount: number
  total: number
  hasItemsWithoutPrice: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addItem = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { 
                ...item, 
                quantity: Math.min(
                  item.product.stock || 99999, 
                  item.quantity + quantity
                ) 
              }
            : item
        )
      }
      return [...prevItems, { product, quantity }]
    })
    openCart()
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(productId)
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { 
                ...item, 
                quantity: Math.min(
                  item.product.stock || 99999,
                  quantity
                ) 
              }
            : item
        )
      )
    }
  }

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId))
  }

  // Calcular el total solo de los productos que tienen precio
  const total = items.reduce((sum, item) => {
    if (typeof item.product.price === 'number') {
      return sum + (item.product.price * item.quantity)
    }
    return sum
  }, 0)

  // Contar todos los items, tengan precio o no
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Verificar si hay productos sin precio
  const hasItemsWithoutPrice = items.some(item => typeof item.product.price !== 'number')

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      itemsCount,
      total,
      hasItemsWithoutPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 