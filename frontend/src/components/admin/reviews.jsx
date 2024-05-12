import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Reviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/reviews')

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setReviews(data)
      } catch (error) {
        toast.error('Failed to load invoices. Please try again later.')
      }
    }

    fetchData()
  }, [])

  console.log(reviews)

  const truncateDescription = (description) => {
    return description?.length > 25
      ? description?.substring(0, 25) + '...'
      : description
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">User ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">Book ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">Created At</th>
            <th className="px-4 py-2 font-medium text-gray-900">Rating</th>
            <th className="px-4 py-2 font-medium text-gray-900">Comment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reviews.map((review, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-center text-gray-900">
                {review.id}
              </td>
              <td className="px-4 py-2 text-center text-gray-900">
                {review.user.id}
              </td>
              <td className="px-4 py-2 text-center text-gray-900">
                {review.book.id}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {review.createdAt}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {review.rating}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {truncateDescription(review.comment)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reviews
