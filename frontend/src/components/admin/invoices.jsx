import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Invoices() {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/orders')

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setInvoices(data)
      } catch (error) {
        toast.error('Failed to load invoices. Please try again later.')
      }
    }

    fetchData()
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">User ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">Status</th>
            <th className="px-4 py-2 font-medium text-gray-900">Date</th>
            <th className="px-4 py-2 font-medium text-gray-900">Price</th>
            <th className="px-4 py-2 font-medium text-gray-900">
              Payment Method
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-center text-gray-900">
                {invoice.id}
              </td>
              <td className="px-4 py-2 text-center text-gray-900">
                {invoice.user.id}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.status}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.orderDate}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.totalPrice}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                Cash On Delivery
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Invoices
