import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

// 🔁 Загрузка из localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return []

  const savedCart = localStorage.getItem('cart')
  try {
    return savedCart ? JSON.parse(savedCart) : []
  } catch (e) {
    console.error('Ошибка парсинга cart из localStorage', e)
    return []
  }
}

// 💾 Сохранение в localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const item = action.payload
      const existing = state.find(i => i.id === item.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.push({ ...item, quantity: 1 })
      }

      saveCartToLocalStorage(state)
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existing = state.find(i => i.id === id)

      if (existing) {
        existing.quantity += 1
        saveCartToLocalStorage(state)
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existing = state.find(i => i.id === id)

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1
        } else {
          // Удаляем товар, если количество <= 0
          return state.filter(item => item.id !== id)
        }
      }

      saveCartToLocalStorage(state)
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const newState = state.filter(item => item.id !== id)
      saveCartToLocalStorage(newState)
      return newState
    },
  },
})

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions

export default cartSlice.reducer