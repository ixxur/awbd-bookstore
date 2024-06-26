import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import Breadcrumbs from '../components/search/breadcrumbs'
import Navigation from '../components/landing/navigation'
import Footer from '../components/landing/footer'

function SearchProducts() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const query = searchParams.get('query') || ''

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/books')

        if (!response.ok) {
          throw new Error()
        }
        const { content } = await response.json()

        const filteredData = content.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.author.name.toLowerCase().includes(query.toLowerCase()) ||
            product.genre.name.toLowerCase().includes(query.toLowerCase())
        )

        setProducts(filteredData)
      } catch (error) {
        toast.error('Failed to load products. Please try again later.')
      }
    }

    if (query) {
      fetchData()
    }
  }, [query])

  return (
    <section className="w-screen min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <Navigation />

        <Breadcrumbs />

        <div className="mx-auto py-8 sm:py-12 px-4">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Search Results
            </h2>
            <p className="mt-4 text-gray-500">
              Showing results for &ldquo;{query}&ldquo;
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id} className="group block overflow-hidden">
                <Link to={`/books/${product.id}`}>
                  <img
                    src="https://images.unsplash.com/photo-1714423718253-b1bd2d95ddd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={product.title}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />
                  <div className="relative bg-gray-50 pt-3">
                    <h2 className="text-lg text-gray-800 group-hover:underline group-hover:underline-offset-4">
                      {product.title}
                    </h2>
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {product.author.name}
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
            {products.length === 0 && (
              <p>No books found matching your search criteria.</p>
            )}
          </ul>
        </div>

        <Footer />
      </div>
    </section>
  )
}

export default SearchProducts
