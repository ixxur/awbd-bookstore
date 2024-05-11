import { Link } from 'react-router-dom'

function Content() {
  return (
    <section className="container px-2">
      <div className="py-8sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Discover Classics
            </h2>

            <p className="mt-4 max-w-md sm:max-w-2xl text-gray-600">
              Explore our extensive collection of Penguin Classics. Dive into
              timeless literature with our specially curated selection from
              Penguin Books. From the iconic works of Charles Dickens to the
              profound narratives of Virginia Woolf, our Penguin Classics
              showcase offers everything for the discerning reader. Perfect for
              collectors and literary enthusiasts alike.
            </p>

            <Link
              to="/books/search?query=classic"
              className="mt-8 inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Find Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content
