import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/users')

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setUsers(data)
      } catch (error) {
        toast.error('Failed to load users. Please try again later.')
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
            <th className="px-4 py-2 font-medium text-gray-900">Username</th>
            <th className="px-4 py-2 font-medium text-gray-900">Email</th>
            <th className="px-4 py-2 font-medium text-gray-900">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-center font-medium text-gray-900">
                {user.id}
              </td>
              <td className="px-4 py-2 text-center font-medium text-gray-900">
                {user.username}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {user.email}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
