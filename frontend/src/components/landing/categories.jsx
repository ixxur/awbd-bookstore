import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/genres')

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        const sortedCategories = data.slice(0, 6)
        setCategories(sortedCategories)
      } catch (error) {
        toast.error('Failed to load categories. Please try again later.')
      }
    }

    fetchData()
  }, [])

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
        {categories?.map((category, index) => (
          <Link
            to={`/books/search?query=${encodeURIComponent(category)}`}
            key={index}
          >
            <div className="px-1 text-center hover:bg-blue-600 hover:text-white h-16 rounded-lg bg-gray-200 flex justify-center items-center text-gray-700">
              {category}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
