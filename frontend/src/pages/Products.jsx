import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Navigation from '../components/landing/navigation'
import Footer from '../components/landing/footer'
import Breadcrumbs from '../components/listing/breadcrumbs'
import SortSelect from '../components/listing/sort-select'
import Filters from '../components/listing/filters'
import ProductList from '../components/listing/product-list'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [sortMethod, setSortMethod] = useState(searchParams.get('sort') || '')
  const [filter, setFilter] = useState({
    inStock: searchParams.get('inStock') === 'true',
    outOfStock: searchParams.get('outOfStock') === 'true',
    priceFrom: searchParams.get('priceFrom') || '',
    priceTo: searchParams.get('priceTo') || '',
  })

  const sortProducts = (products, method) => {
    switch (method) {
      case 'Title, ASC':
        return [...products].sort((a, b) => a.title.localeCompare(b.title))
      case 'Title, DESC':
        return [...products].sort((a, b) => b.title.localeCompare(a.title))
      case 'Price, ASC':
        return [...products].sort((a, b) => a.price - b.price)
      case 'Price, DESC':
        return [...products].sort((a, b) => b.price - a.price)
      default:
        return products
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/books.json')
        let data = await response.json()
        data = sortProducts(data, sortMethod)
        data = data.filter((product) => {
          const priceCondition =
            (!filter.priceFrom || product.price >= filter.priceFrom) &&
            (!filter.priceTo || product.price <= filter.priceTo)
          const stockCondition =
            (filter.inStock && product.stock > 0) ||
            (filter.outOfStock && product.stock === 0) ||
            (!filter.inStock && !filter.outOfStock)
          return priceCondition && stockCondition
        })
        setProducts(data)
      } catch (error) {
        toast.error('Failed to load products. Please try again later.')
      }
    }

    fetchData()
  }, [sortMethod, filter])

  useEffect(() => {
    const params = {}
    if (sortMethod) params.sort = sortMethod
    if (filter.inStock) params.inStock = 'true'
    if (filter.outOfStock) params.outOfStock = 'true'
    if (filter.priceFrom) params.priceFrom = filter.priceFrom
    if (filter.priceTo) params.priceTo = filter.priceTo
    setSearchParams(params)
  }, [sortMethod, filter, setSearchParams])

  return (
    <div className="w-screen flex justify-center bg-gray-50">
      <div className="container flex flex-col justify-between">
        <Navigation />

        <Breadcrumbs />

        <section className="h-full">
          <div className="mx-auto py-8 sm:py-12 px-4">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Books Collection
              </h2>
              <p className="mt-4 max-w-md sm:max-w-3xl text-gray-500">
                Browse our best-selling books, chosen by our community of
                readers. Discover titles across all genres that have captured
                the hearts and minds of book lovers. Find your next favorite
                read today!
              </p>
            </header>

            <div className="mt-4 grid lg:grid-cols-4 gap-8">
              {/* Sort & Filters */}
              <div>
                <SortSelect
                  sortMethod={sortMethod}
                  setSortMethod={setSortMethod}
                />
                <Filters filter={filter} setFilter={setFilter} />
              </div>

              <div className="lg:col-span-3">
                <ProductList products={products} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

export default Products
