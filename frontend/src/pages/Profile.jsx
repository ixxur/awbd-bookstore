import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/user'
import Footer from '../components/landing/footer'
import Navigation from '../components/landing/navigation'
import Orders from '../components/profile/orders'

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useUserStore((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const [activeTab, setActiveTab] = useState('details') // manage active tab

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <section className="w-screen h-screen bg-gray-50">
      <div className="h-full container mx-auto flex flex-col">
        <Navigation />

        <div className="flex-1 mt-10">
          <div className="mt-4 flex gap-10">
            <ul className="space-y-1">
              <li
                onClick={() => setActiveTab('details')}
                className={`cursor-pointer block rounded-lg px-4 py-2 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'text-gray-700 bg-gray-100'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                Your Details
              </li>

              <li
                onClick={() => setActiveTab('invoices')}
                className={`cursor-pointer pointer block rounded-lg px-4 py-2 text-sm font-medium ${
                  activeTab === 'invoices'
                    ? 'text-gray-700 bg-gray-100'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                Invoices
              </li>

              <li
                onClick={handleLogout}
                className="cursor-pointer pointer block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Logout
              </li>
            </ul>

            <section className="flex-1 h-4/6">
              {activeTab === 'details' && user ? (
                <div>
                  <h2 className="text-lg font-semibold mb-4 mt-1">
                    Your Details
                  </h2>
                  <p className="mb-2">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                </div>
              ) : activeTab === 'invoices' ? (
                <Orders />
              ) : (
                <p>No user details available. Please log in.</p>
              )}
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  )
}

export default Profile
