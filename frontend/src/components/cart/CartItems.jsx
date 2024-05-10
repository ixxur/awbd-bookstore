import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import useUserStore from '../../store/user'
import { Trash2 } from 'lucide-react'

function CartItems({ onNext }) {
  const navigate = useNavigate()

  const { user, updateCartItemQuantity, removeCartItem } = useUserStore()

  if (!user) {
    navigate('/login')
  }

  const handleQuantityChange = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity)
  }

  const handleRemoveItem = (itemId) => {
    if (confirm('Are you sure?')) {
      removeCartItem(itemId)
      toast.success('Book was removed from cart')
    }
  }

  const calculateTotal = () => {
    return user?.cart?.items.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    )
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
                          src={item.book.image}
                          alt={item.book.image}
                          className="size-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">
                            {item.book.title}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10.5px] text-gray-600">
                            <div>
                              <dt className="inline">Author: </dt>
                              <dd className="inline">{item.book.author}</dd>
                            </div>

                            <div>
                              <dt className="inline">Genre: </dt>
                              <dd className="inline">{item.book.genre}</dd>
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

              <div className="flex md:justify-end items-start">
                <div className="w-screen md:max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium mb-2">
                      <dt>Items</dt>
                    </div>

                    {user?.cart?.items.map((item) => (
                      <div key={item.id} className="flex justify-between py-1">
                        <dt className="w-1/4">{item.book.title}</dt>
                        <dd className="w-1/4 flex justify-end">
                          {item.quantity}x
                        </dd>
                        <dd className="w-1/4 flex justify-end">
                          € {item.book.price}
                        </dd>
                        <dd className="w-1/4 flex justify-end">
                          € {item.book.price * item.quantity}
                        </dd>
                      </div>
                    ))}

                    <div className="flex justify-between !text-base font-medium pt-5">
                      <dt>Total</dt>
                      <dd>€ {calculateTotal().toFixed(2)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <button
                      onClick={onNext}
                      className="block rounded w-full text-center bg-blue-700 px-5 py-3 text-sm text-blue-100 transition hover:bg-blue-600"
                    >
                      Next Step ( Address )
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartItems
