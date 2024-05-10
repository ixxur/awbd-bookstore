import useUserStore from '../../store/user'

function PaymentForm({ onNext, onBack }) {
  const { user } = useUserStore()

  const calculateTotal = () => {
    return user?.cart?.items.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    )
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    onNext()
  }

  return (
    <div className="h-full container mx-auto">
      <section className="h-3/4 flex w-full">
        <div className="w-full py-8 px-4 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <fieldset className="space-y-4">
              <legend className="sr-only">Delivery</legend>

              <div>
                <label
                  htmlFor="DeliveryStandard"
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                  <p className="text-gray-700">Cash</p>

                  <p className="text-gray-900">Free</p>

                  <input
                    type="radio"
                    name="DeliveryOption"
                    value="DeliveryStandard"
                    id="DeliveryStandard"
                    className="sr-only"
                    checked
                  />
                </label>
              </div>

              <button
                className="w-full p-0 m-0 active:border-0 hover:border-0 disabled:opacity-50"
                disabled={true}
              >
                <label
                  htmlFor="DeliveryPriority"
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-white p-4 text-sm font-medium shadow-sm"
                >
                  <p className="text-gray-700">Credit Card</p>

                  <p className="text-gray-900">Coming Soon</p>

                  <input
                    type="radio"
                    name="DeliveryOption"
                    value="DeliveryPriority"
                    id="DeliveryPriority"
                    className="sr-only"
                  />
                </label>
              </button>
            </fieldset>

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

                <div className="flex justify-between space-x-4">
                  <button
                    onClick={onBack}
                    className="block rounded w-full text-center bg-blue-700 px-5 py-3 text-sm text-blue-100 transition hover:bg-blue-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    className="block rounded w-full text-center bg-blue-700 px-5 py-3 text-sm text-blue-100 transition hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PaymentForm
