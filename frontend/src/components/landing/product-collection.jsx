import { Link } from 'react-router-dom'

function ProductCollection() {
  return (
    <section className="container px-2">
      <div className="py-8 sm:py-12">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Popular Books
          </h2>

          <p className="mt-1 text-xs md:text-sm max-w-xl text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <Link to="/" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
              />

              <div className="relative bg-gray-50 pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {' '}
                    £24.00 GBP{' '}
                  </span>
                </p>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
              />

              <div className="relative bg-gray-50 pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {' '}
                    £24.00 GBP{' '}
                  </span>
                </p>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
              />

              <div className="relative bg-gray-50 pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {' '}
                    £24.00 GBP{' '}
                  </span>
                </p>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
              />

              <div className="relative bg-gray-50 pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {' '}
                    £24.00 GBP{' '}
                  </span>
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default ProductCollection
