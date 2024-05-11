import useUserStore from '../../store/user'

function SummaryPanel({
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
}) {
  const { user } = useUserStore()

  const calculateTotal = () => {
    return user?.cart?.items.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    )
  }

  return (
    <div className="flex md:justify-end items-start">
      <div className="w-screen md:max-w-lg space-y-4">
        <dl className="space-y-0.5 text-sm text-gray-700">
          <div className="flex justify-between !text-base font-medium mb-2">
            <dt>Items</dt>
          </div>

          {user?.cart?.items.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <dt className="w-1/4">{item.book.title}</dt>
              <dd className="w-1/4 flex justify-end">{item.quantity}x</dd>
              <dd className="w-1/4 flex justify-end">€ {item.book.price}</dd>
              <dd className="w-1/4 flex justify-end">
                € {item.book.price * item.quantity}
              </dd>
            </div>
          ))}

          <div className="flex justify-between !text-base font-medium pt-5">
            <dt>Total</dt>
            <dd>€ {calculateTotal()?.toFixed(2)}</dd>
          </div>
        </dl>

        <div className="flex justify-between space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="block rounded w-full text-center bg-blue-700 px-5 py-3 text-sm text-blue-100 transition hover:bg-blue-600"
            >
              {backLabel}
            </button>
          )}
          <button
            onClick={onNext}
            className="block rounded w-full text-center bg-blue-700 px-5 py-3 text-sm text-blue-100 transition hover:bg-blue-600"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SummaryPanel
