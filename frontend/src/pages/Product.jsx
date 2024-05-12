import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Navigation from '../components/landing/navigation'
import Footer from '../components/landing/footer'
import Breadcrumbs from '../components/product/breadcrumbs'
import useUserStore from '../store/user'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const { user, addProductToCart } = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books/${id}`)

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()

        setProduct(data)
      } catch (error) {
        toast.error('Failed to load product details. Please try again later.')
      }
    }

    fetchData()
  }, [id])

  const handleAddToCart = async () => {
    addProductToCart(product)

    try {
      const response = await fetch(
        `http://localhost:8080/users/${user.id}/cart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: product.id,
            quantity: 1,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update cart in the database.')
      }
    } catch (error) {
      console.error('Failed to update cart on the backend:', error)
    }
    toast.success('Product added to cart!')
  }

  return (
    <div className="w-screen sm:h-screen flex justify-center bg-gray-50">
      <div className="container flex flex-col justify-between">
        <Navigation />

        <Breadcrumbs product={product} />

        <div className="px-4 my-10 h-full grid justify-between grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="h-[25rem] lg:w-5/6 rounded-lg bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1714423718253-b1bd2d95ddd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full rounded-xl"
            />
          </div>
          <div>
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Title</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {product.title}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Author</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {product?.author?.name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Price</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    € {product.price}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Genre</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {product.genre?.name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">
                    Publication Year
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {product.publicationYear}
                  </dd>
                </div>

                {product.stock ? (
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Stock</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {`Available - ${product.stock} book(s) left`}
                    </dd>
                  </div>
                ) : (
                  ''
                )}

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Description</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {product.description}
                  </dd>
                </div>

                {user ? (
                  <button
                    disabled={!product.stock}
                    onClick={handleAddToCart}
                    className="disabled:opacity-50 mt-8 w-full text-center inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    {product.stock ? 'Add To Cart' : 'Out Of Stock'}
                  </button>
                ) : (
                  <Link to="/login" className="text-white">
                    <div className=" mt-8 w-full text-center inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                      {product.stock ? 'Add To Cart' : 'Out Of Stock'}
                    </div>
                  </Link>
                )}
              </dl>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Product
