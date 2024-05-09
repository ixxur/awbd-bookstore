import { Link } from 'react-router-dom'

function Categories() {
  return (
    <div className="container px-4 mb-6">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Collections
        </h2>

        <p className="mt-1 text-xs md:text-sm max-w-xl text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
          praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
          natus?
        </p>
      </header>

      <div className=" grid grid-cols-3 gap-10 lg:grid-cols-6 lg:gap-10">
        <Link to="/">
          <div className="hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Category 1
          </div>
        </Link>
        <Link to="/">
          <div className="hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Category 2
          </div>
        </Link>
        <Link to="/">
          <div className="hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Category 3
          </div>
        </Link>
        <Link to="/">
          <div className="hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Category 4
          </div>
        </Link>
        <Link to="/">
          <div className="hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Category 5
          </div>
        </Link>
        <Link to="/">
          <div className="hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Category 6
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Categories
