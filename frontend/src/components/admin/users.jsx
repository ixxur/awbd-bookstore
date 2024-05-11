import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setUsers([
      {
        id: 1,
        username: 'johndoe',
        email: 'john.doe@example.com',
        role: 'Client',
        createdAt: '01/01/2022',
      },
      {
        id: 2,
        username: 'janedoe',
        email: 'jane.doe@example.com',
        role: 'Client',
        createdAt: '02/02/2022',
      },
      {
        id: 3,
        username: 'garybarlow',
        email: 'gary.barlow@example.com',
        role: 'Admin',
        createdAt: '03/03/2022',
      },
    ])
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
            <th className="px-4 py-2 font-medium text-gray-900">Created At</th>
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

              <td className="px-4 py-2 text-center text-gray-700">
                {user.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
