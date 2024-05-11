import SummaryPanel from './summary-panel'

function PaymentForm({ onNext, onBack }) {
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
              <legend className="sr-only">Payment Method</legend>

              <div>
                <label
                  htmlFor="DeliveryStandard"
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                  <p className="text-gray-700">Cash On Delivery</p>
                  <p className="text-gray-900">Free</p>
                  <input
                    type="radio"
                    name="PaymentOption"
                    value="DeliveryStandard"
                    id="DeliveryStandard"
                    className="sr-only"
                    checked
                    onChange={() => {}}
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
                    name="PaymentOption"
                    value="DeliveryPriority"
                    id="DeliveryPriority"
                    className="sr-only"
                    disabled
                  />
                </label>
              </button>
            </fieldset>

            <SummaryPanel
              onNext={handleFormSubmit}
              onBack={onBack}
              nextLabel="Next Step"
              backLabel="Back"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default PaymentForm
