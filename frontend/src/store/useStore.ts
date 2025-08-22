import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
interface User {
  id: number
  email: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

// Auth Store
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          const response = await fetch('http://localhost:3005/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

          if (response.ok) {
            const data = await response.json()
            set({ 
              user: data.user, 
              token: data.token, 
              isAuthenticated: true 
            })
            return true
          }
          return false
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },

      register: async (email: string, password: string) => {
        try {
          const response = await fetch('http://localhost:3005/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

          if (response.ok) {
            const data = await response.json()
            set({ 
              user: data.user, 
              token: data.token, 
              isAuthenticated: true 
            })
            return true
          }
          return false
        } catch (error) {
          console.error('Register error:', error)
          return false
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      setUser: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Cart Store
interface CartState {
  cart: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (item) => {
        const { cart } = get()
        const existing = cart.find((i) => i.id === item.id)
        
        let newCart
        if (existing) {
          newCart = cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        } else {
          newCart = [...cart, { ...item, quantity: 1 }]
        }

        const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        set({ cart: newCart, totalItems, totalPrice })
      },

      removeFromCart: (id) => {
        const { cart } = get()
        const newCart = cart.filter((i) => i.id !== id)
        const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        set({ cart: newCart, totalItems, totalPrice })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }

        const { cart } = get()
        const newCart = cart.map((i) =>
          i.id === id ? { ...i, quantity } : i
        )
        const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        set({ cart: newCart, totalItems, totalPrice })
      },

      clearCart: () => set({ cart: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: 'cart-storage' }
  )
)

// Products Store
interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>
  updateProduct: (id: number, product: Partial<Product>) => Promise<boolean>
  deleteProduct: (id: number) => Promise<boolean>
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const { token } = useAuthStore.getState()
      const response = await fetch('http://localhost:3005/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const products = await response.json()
        set({ products, loading: false })
      } else {
        set({ error: 'Failed to fetch products', loading: false })
      }
    } catch (error) {
      set({ error: 'Network error', loading: false })
    }
  },

  createProduct: async (product) => {
    try {
      const { token } = useAuthStore.getState()
      const response = await fetch('http://localhost:3005/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        get().fetchProducts() // Refresh products
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },

  updateProduct: async (id, product) => {
    try {
      const { token } = useAuthStore.getState()
      const response = await fetch(`http://localhost:3005/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        get().fetchProducts() // Refresh products
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },

  deleteProduct: async (id) => {
    try {
      const { token } = useAuthStore.getState()
      const response = await fetch(`http://localhost:3005/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        get().fetchProducts() // Refresh products
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
}))
