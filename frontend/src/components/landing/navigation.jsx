import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useUserStore from '../../store/user'
import { User, ShoppingCart } from 'lucide-react'

function Navigation() {
  const { user, loading, fetchUser } = useUserStore()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) return <div>Loading...</div>

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`/books/search?query=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <header className="container px-4">
      <div className="flex h-16 items-center justify-between">
        <Link to="/" className="text-gray-700">
          🦑 SquidBooks
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="w-2/5 flex items-center gap-4"
        >
          <input
            type="text"
            placeholder="Search by title, author, genre..."
            className="px-4 w-full py-2 rounded-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

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
