import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import useUserStore from '../../store/user'
import { Trash2 } from 'lucide-react'
import SummaryPanel from './summary-panel'

function CartItems({ onNext }) {
  const navigate = useNavigate()

  const { user, updateCartItemQuantity, removeCartItem } = useUserStore()

  if (!user) {
    navigate('/login')
  }

  const handleQuantityChange = async (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity)

    if (!quantity) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/${user?.id}/cart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: itemId,
            quantity,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to register. Please try again.')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRemoveItem = (itemId) => {
    if (confirm('Are you sure?')) {
      removeCartItem(itemId)
      toast.success('Book was removed from cart')
    }
  }

  return (
    <div className="h-full container mx-auto">
      <section className="h-3/4 flex w-full">
        <div className="w-full py-8 px-4 sm:py-12">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-4">
                {user?.cart?.items?.length ? (
                  user?.cart?.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4">
                      <Link
                        to={`/books/${item.book.id}`}
                        className="flex items-center gap-4"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1714423718253-b1bd2d95ddd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="test"
                          className="size-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">
                            {item.book.title}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10.5px] text-gray-600">
                            <div>
                              <dt className="inline">Author: </dt>
                              <dd className="inline">
                                {item.book.author.name}
                              </dd>
                            </div>

                            <div>
                              <dt className="inline">Genre: </dt>
                              <dd className="inline">{item.book.genre.name}</dd>
                            </div>
                          </dl>
                        </div>
                      </Link>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            {' '}
                            Quantity{' '}
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value)
                              )
                            }
                            id="Line1Qty"
                            className="h-8 w-12 rounded bg-gray-200 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </form>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-600 hover:border-gray-50 hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1>No items found</h1>
                )}
              </ul>

              {user?.cart?.items?.length ? (
                <SummaryPanel
                  onNext={onNext}
                  onBack=""
                  nextLabel="Next Step"
                  backLabel="Back"
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartItems
