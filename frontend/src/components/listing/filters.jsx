function Filters({ filter, setFilter }) {
  return (
    <div className="space-y-4">
      <p className="block text-xs font-medium text-gray-700">Filters</p>

      {/* Availability Filter */}
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium">Availability</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200">
          <header className="flex items-center justify-between p-4">
            <button
              type="button"
              onClick={() =>
                setFilter({
                  ...filter,
                  inStock: false,
                  outOfStock: false,
                })
              }
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            <li>
              <label
                htmlFor="FilterInStock"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterInStock"
                  checked={filter.inStock}
                  onChange={() =>
                    setFilter({
                      ...filter,
                      inStock: !filter.inStock,
                    })
                  }
                  className="size-5 rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  In Stock
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterOutOfStock"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterOutOfStock"
                  checked={filter.outOfStock}
                  onChange={() =>
                    setFilter({
                      ...filter,
                      outOfStock: !filter.outOfStock,
                    })
                  }
                  className="size-5 rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  Out of Stock
                </span>
              </label>
            </li>
          </ul>
        </div>
      </details>

      {/* Price Range Filter */}
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium">Price</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200">
          <header className="flex items-center justify-between p-4">
            <button
              type="button"
              onClick={() =>
                setFilter({
                  ...filter,
                  priceFrom: '',
                  priceTo: '',
                })
              }
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label
                htmlFor="FilterPriceFrom"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  id="FilterPriceFrom"
                  value={filter.priceFrom}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      priceFrom: e.target.value,
                    })
                  }
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>

              <label
                htmlFor="FilterPriceTo"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  id="FilterPriceTo"
                  value={filter.priceTo}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      priceTo: e.target.value,
                    })
                  }
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>
            </div>
          </div>
        </div>
      </details>
    </div>
  )
}

export default Filters
