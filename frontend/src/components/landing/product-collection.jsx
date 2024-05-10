import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProductCollection() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/books.json')
        const data = await response.json()
        const sortedProducts = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)

        setProducts(sortedProducts)
      } catch (error) {
        toast.error('Failed to load products. Please try again later.')
      }
    }

    fetchData()
  }, [])

  return (
    <section className="container px-2">
      <div className="py-8 sm:py-12">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Popular Books
          </h2>

          <p className="mt-1 text-xs md:text-sm max-w-md sm:max-w-2xl text-gray-500">
            Browse our best-selling books, chosen by our community of readers.
            Discover titles across all genres that have captured the hearts and
            minds of book lovers. Find your next favorite read today!
          </p>
        </header>

        <ul className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`/books/${product.id}`}
                className="group block overflow-hidden"
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-gray-50 pt-3">
                  <h2 className="text-lg text-gray-800 group-hover:underline group-hover:underline-offset-4">
                    {product.title}
                  </h2>

                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.author}
                  </h3>

                  <p className="mt-2">
                    <span className="tracking-wider text-gray-900">
                      € {product.price}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductCollection
