import { useState } from 'react'
import useUserStore from '../store/user'
import Footer from '../components/landing/footer'
import Navigation from '../components/landing/navigation'
import Users from '../components/admin/users'
import Invoices from '../components/admin/invoices'
import Reviews from '../components/admin/reviews'

function AdminDashboard() {
  const { user } = useUserStore((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const [activeTab, setActiveTab] = useState('details')

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
                Users
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
                onClick={() => setActiveTab('reviews')}
                className={`cursor-pointer pointer block rounded-lg px-4 py-2 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'text-gray-700 bg-gray-100'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                Reviews
              </li>
            </ul>

            <section className="flex-1 h-4/6">
              {activeTab === 'details' && user ? (
                <Users />
              ) : activeTab === 'invoices' ? (
                <Invoices />
              ) : (
                <Reviews />
              )}
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  )
}

export default AdminDashboard
