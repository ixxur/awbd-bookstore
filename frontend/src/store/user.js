import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useUserStore = create(devtools((set, get) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    const user = get().user
    set({ loading: true })

    if(user) {
      set({ user, loading: false })
      return
    }

    try {
      const response = await fetch('/data/user.json')
      const userData = await response.json()
      set({ user: userData, loading: false })
    } catch (error) {
      console.error('Failed to fetch user:', error)
      set({ loading: false })
    }
  },
  updateCartItemQuantity: (itemId, quantity) => {
    const user = get().user
    if (user && user.cart && user.cart.items) {
      const updatedItems = user.cart.items.map(item =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
      set({ user: { ...user, cart: { ...user.cart, items: updatedItems } } })
    }
  },
  removeCartItem: (itemId) => {
    const user = get().user
    if (user && user.cart && user.cart.items) {
      const filteredItems = user.cart.items.filter(item => item.id !== itemId)
      set({ user: { ...user, cart: { ...user.cart, items: filteredItems } } })
    }
  },
  isProductInCart: (productId) => {
    const user = get().user
    return user && user.cart && user.cart.items.some(item => item.book.id === productId)
  },
  updateUserAddress: (address) => {
    const user = get().user;
    if (user) {
      set({ user: { ...user, address } });
    }
  },
  addProductToCart: (product) => {
    const user = get().user
    if (user && user.cart) {
      const newItem = {
        book: product,
        quantity: 1
      }
      
      if (user.cart.items.length > 0) {
        const maxId = user.cart.items.reduce((max, item) => item.id > max ? item.id : max, user.cart.items[0].id)
        newItem.id = maxId + 1
      } else {
        newItem.id = 1
      }
      set({
        user: {
          ...user,
          cart: {
            ...user.cart,
            items: [...user.cart.items, newItem]
          }
        }
      })
    }
  }
})))

export default useUserStore
