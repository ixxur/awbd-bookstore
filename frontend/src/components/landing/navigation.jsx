import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import useUserStore from '../../store/user'
import { User, ShoppingCart } from 'lucide-react'

function Navigation() {
  const { user, loading, fetchUser } = useUserStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) return <div>Loading...</div>

  return (
    <header className="container px-4">
      <div className="flex h-16 items-center justify-between">
        <Link to="/" className="text-gray-700">
          🦑 SquidBooks
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-6">
              <Link
                className="text-md font-medium text-gray-700 flex items-center justify-center"
                to="/profile"
              >
                <User className="h-6 w-6" />
              </Link>
              <Link className="text-sm font-medium text-gray-700" to="/cart">
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                className="rounded-md bg-blue-600 hover:bg-blue-700 hover:text-white px-5 py-2.5 text-sm font-medium text-white shadow"
                to="/login"
              >
                Log In
              </Link>
              <Link
                className="rounded-md bg-gray-100 hover:bg-gray-200 px-5 py-2.5 text-sm font-medium text-blue-600"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
