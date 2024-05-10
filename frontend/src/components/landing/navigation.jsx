import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <header className="container px-4">
      <div>
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="text-gray-700">
              🦑 SquidBooks
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <Link
                className="rounded-md bg-blue-600 hover:text-white px-5 py-2.5 text-sm font-medium text-white shadow"
                to="/login"
              >
                Login
              </Link>

              <div className="flex">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                  to="/register"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
