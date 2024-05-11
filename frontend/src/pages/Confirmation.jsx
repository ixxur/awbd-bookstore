import { useParams } from 'react-router-dom'
import useUserStore from '../store/user'

import Navigation from '../components/landing/navigation'
import Footer from '../components/landing/footer'
import Breadcrumbs from '../components/confirmation/breadcrumbs'
import { useEffect, useState } from 'react'

function OrderConfirmation() {
  const { id } = useParams()
  const getOrderById = useUserStore((state) => state.getOrderById)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const orderId = parseInt(id)
    if (!isNaN(orderId)) {
      const fetchedOrder = getOrderById(orderId)
      setOrder(fetchedOrder)
    }
  }, [id, getOrderById])

  if (!order) {
    return <p>Order not found. Please check your information.</p>
  }

  return (
    <div className="w-screen sm:h-screen flex justify-center bg-gray-50">
      <div className="container flex flex-col justify-between">
        <Navigation />
        <Breadcrumbs id={id} />

        <div className="px-4 py-8">
          <h1 className="text-lg font-semibold text-gray-800">
            Order Confirmation
          </h1>
          <p className="text-sm text-gray-600">
            Thank you for your purchase! Your order has been placed
            successfully.
          </p>
          <div className="mt-4 border-t pt-4">
            <h2 className="text-md font-medium text-gray-800">
              Order Details:
            </h2>
            <ul>
              <li>
                <strong>Order ID:</strong> {order.id}
              </li>
              <li>
                <strong>Date:</strong>{' '}
                {new Date(order.date).toLocaleDateString()}
              </li>
              <li>
                <strong>Total:</strong> €{order.total.toFixed(2)}
              </li>
              <li>
                <strong>Status:</strong> {order.status}
              </li>
            </ul>
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-800">
                Shipping Address:
              </h3>
              <p>
                {order.address.street}, {order.address.city},{' '}
                {order.address.country}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-800">Items:</h3>
              {order.items.map((item) => (
                <div key={item.id}>
                  <p>
                    {item.book.title} - {item.quantity} x €
                    {item.book.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default OrderConfirmation
