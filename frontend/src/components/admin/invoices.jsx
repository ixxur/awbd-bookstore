import { useEffect, useState } from 'react'

function Invoices() {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setInvoices([
      {
        id: 101,
        userId: 1,
        status: 'Paid',
        date: '2023-05-01',
        price: '$300.00',
        address: '123 Main St, Anytown, USA',
        paymentMethod: 'Cash on Delivery',
      },
      {
        id: 102,
        userId: 2,
        status: 'Pending',
        date: '2023-05-02',
        price: '$450.00',
        address: '456 Second St, Othertown, USA',
        paymentMethod: 'Cash on Delivery',
      },
      {
        id: 103,
        userId: 3,
        status: 'Shipped',
        date: '2023-05-03',
        price: '$200.00',
        address: '789 Third St, Anothertown, USA',
        paymentMethod: 'Cash on Delivery',
      },
    ])
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
            <th className="px-4 py-2 font-medium text-gray-900">Address</th>
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
                {invoice.userId}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.status}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.date}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.price}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.address}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {invoice.paymentMethod}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Invoices
