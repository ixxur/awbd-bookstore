import { Link } from 'react-router-dom'

function Banner() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Explore the vast world
            <strong className="font-extrabold text-blue-600 sm:block">
              {' '}
              of literature with SquidBooks.{' '}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            From timeless classics to contemporary bestsellers, we offer an
            extensive collection tailored to fuel your passion for reading.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium hover:text-white text-white shadow focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              to="/"
            >
              Get Started
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              to="/"
            >
              Find Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
