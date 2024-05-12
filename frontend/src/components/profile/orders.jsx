import { useEffect, useState } from 'react'
import useUserStore from '../../store/user'
import { toast } from 'react-toastify'

function Orders() {
  const [orders, setOrders] = useState([])
  const { user } = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${user.id}/orders`
        )

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        const sortedCategories = data.slice(0, 6)
        setOrders(sortedCategories)
      } catch (error) {
        toast.error('Failed to load categories. Please try again later.')
      }
    }

    fetchData()
  }, [user?.id])

  console.log(orders)
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Your Orders</h3>
      <ul>
        {orders &&
          orders?.map((order) => (
            <li
              key={order.id}
              className="mb-2 shadow-md p-4 rounded max-w-lg flex gap-4"
            >
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Order Id
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Total
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {order.totalPrice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {order.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Orders
