import { Link } from 'react-router-dom'

function Categories() {
  return (
    <div className="container px-4 mb-6">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Collections
        </h2>

        <p className="mt-1 text-xs md:text-sm max-w-md sm:max-w-2xl text-gray-500">
          Dive into our curated book collections and find your next great read.
          Whether you are into modern fiction, historical novels, or educational
          texts, we have something for every reader&apos;s taste.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-10 lg:grid-cols-6 lg:gap-10">
        <Link to="/">
          <div className="text-center hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Modern Fiction Favorites
          </div>
        </Link>
        <Link to="/">
          <div className="text-center hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Historical Epics
          </div>
        </Link>
        <Link to="/">
          <div className="text-center hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Science and Technology
          </div>
        </Link>
        <Link to="/">
          <div className="text-center hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Literary Classics
          </div>
        </Link>
        <Link to="/">
          <div className="text-center hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Young Adult Adventures
          </div>
        </Link>
        <Link to="/">
          <div className="text-center hover:bg-blue-600 hover:text-white h-24 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
            Self-Help and Wellness
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Categories
