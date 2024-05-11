import { Link } from 'react-router-dom'

function Breadcrumbs({ product }) {
  return (
    <nav aria-label="Breadcrumb" className="mt-4 px-4 w-full">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        <li>
          <Link
            to="/"
            className="block transition hover:text-gray-700 text-gray-600"
          >
            <span className="sr-only"> Home </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        <li className="rtl:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>

        <li>
          <Link
            to="/books"
            className="block transition hover:text-gray-700 text-gray-600"
          >
            {' '}
            Books{' '}
          </Link>
        </li>

        <li className="rtl:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>

        <li>
          <Link
            to={`/books/${product.id}`}
            className="block transition hover:text-gray-700 text-gray-600"
          >
            {product.title}
          </Link>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
