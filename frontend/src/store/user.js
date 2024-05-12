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
          item.id === itemId ? { ...item, quantity: quantity } : item
        )

        // Update the state first
        set({ user: { ...user, cart: { ...user.cart, items: updatedItems } } })

        // Now update the database
        try {
          const response = await fetch(
            `http://localhost:8080/users/${user.id}/cart`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bookId: itemId,
                quantity,
              }),
            }
          )

          if (!response.ok) {
            throw new Error('Failed to update cart in the database.')
          }

          const updatedCart = await response.json()
          set({ user: { ...user, cart: updatedCart } })
        } catch (error) {
          console.error('Failed to update cart:', error)
        }
      }
    },

    removeCartItem: (itemId) => {
      const user = get().user
      if (user && user.cart && user.cart.items) {
        const filteredItems = user.cart.items.filter(
          (item) => item.id !== itemId
        )
        set({ user: { ...user, cart: { ...user.cart, items: filteredItems } } })
      }
    },
    isProductInCart: (productId) => {
      const user = get().user
      return (
        user &&
        user.cart &&
        user.cart.items.some((item) => item.book.id === productId)
      )
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
