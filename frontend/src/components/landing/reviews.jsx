import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { toast } from 'react-toastify'

function Reviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/reviews.json')
        const data = await response.json()
        const sortedReviews = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
        setReviews(sortedReviews)
      } catch (error) {
        toast.error('Failed to load reviews. Please try again later.')
      }
    }

    fetchData()
  }, [])

  return (
    <section className="container px-2">
      <div className="py-12 lg:py-16">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Latest Reviews
          </h2>

          <p className="mt-1 text-xs md:text-sm max-w-md sm:max-w-2xl text-gray-500">
            Discover what our readers have to say about their favorite books.
            Our customer reviews reflect the diverse tastes and insights of our
            community. Read through the experiences to help you decide on your
            next great read!
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="rounded-lg shadow-md bg-gray-100 p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    {review.author}
                  </p>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="mt-1 mr-1 h-5 w-5"
                        color="#ffc107"
                        fill="#ffc107"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{review.text}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
