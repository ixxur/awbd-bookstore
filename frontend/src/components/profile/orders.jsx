import useUserStore from '../../store/user'

function Orders() {
  const { user } = useUserStore()

  if (!user || !user.orders || user.orders.length === 0) {
    return <p>No orders found.</p>
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Your Orders</h3>
      <ul>
        {user.orders.map((order) => (
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
                    {order.total}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
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
