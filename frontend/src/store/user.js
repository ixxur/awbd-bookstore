import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useUserStore = create(
  devtools((set, get) => ({
    user: null,
    loading: true,
    loginUser: async (username, password) => {
      const base64 = btoa(`${username}:${password}`)
      const headers = new Headers({
        Authorization: `Basic ${base64}`,
      })

      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          headers: headers,
        })

        if (!response.ok) {
          throw new Error('Login failed. Check your credentials and try again.')
        }

        const user = await response.json()
        set({ user })
      } catch (error) {
        console.error('Failed to login:', error)
        throw error
      }
    },
    updateCartItemQuantity: async (itemId, quantity) => {
      const user = get().user
      if (user && user.cart && user.cart.items) {
        const updatedItems = user.cart.items.map((item) =>
          item.book.id === itemId ? { ...item, quantity: quantity } : item
        )

        set({ user: { ...user, cart: { ...user.cart, items: updatedItems } } })
      }
    },
    removeCartItem: (bookId) => {
      const user = get().user
      if (user && user.cart && user.cart.items) {
        const filteredItems = user.cart.items.filter(
          (item) => item.book.id !== bookId
        )
        set({ user: { ...user, cart: { ...user.cart, items: filteredItems } } })
      }
    },
    updateUserAddress: (address) => {
      const user = get().user
      if (user) {
        set({ user: { ...user, address } })
      }
    },
    addProductToCart: (product) => {
      const user = get().user
      if (user && user.cart) {
        const newItem = {
          book: product,
          quantity: 1,
        }

        if (user.cart.items.length > 0) {
          const maxId = user.cart.items.reduce(
            (max, item) => (item.id > max ? item.id : max),
            user.cart.items[0].id
          )
          newItem.id = maxId + 1
        } else {
          newItem.id = 1
        }

        set({
          user: {
            ...user,
            cart: {
              ...user.cart,
              items: [...user.cart.items, newItem],
            },
          },
        })
      }
    },
    isBookInCart: (bookId) => {
      const user = get().user
      console.log(user, bookId)
      if (user && user.cart && user.cart.items) {
        console.log(user.cart.items)
        return user.cart.items.some(
          (item) => item.book.id === parseFloat(bookId)
        )
      }
      return false
    },
    addOrder: (orderDetails) => {
      const user = get().user
      if (user) {
        const newOrderId = user.orders ? user.orders.length + 1 : 1
        const newOrder = {
          id: newOrderId,
          items: user.cart.items,
          total: orderDetails.total,
          date: orderDetails.date,
          status: 'In Progress',
          address: user.address,
        }
        const updatedOrders = user.orders
          ? [...user.orders, newOrder]
          : [newOrder]
        set({ user: { ...user, orders: updatedOrders, cart: { items: [] } } })
        return newOrderId
      }
      return null
    },
    clearCart: () => {
      const user = get().user
      if (user) {
        set({ user: { ...user, cart: { items: [] } } })
      }
    },
    getOrderById: (orderId) => {
      const user = get().user
      if (user && user.orders) {
        return user.orders.find((order) => order.id === orderId)
      }
      return null
    },
    logout: () => set({ user: null }),
  }))
)

export default useUserStore
