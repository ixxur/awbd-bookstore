import { useEffect, useState } from 'react'

function Reviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setReviews([
      {
        id: 1,
        userId: 1,
        bookId: 101,
        createdAt: '2023-05-10',
        stars: 5,
        description: 'Great book, highly recommended!',
      },
      {
        id: 2,
        userId: 2,
        bookId: 102,
        createdAt: '2023-05-11',
        stars: 4,
        description: 'Interesting read, a bit long but worth it.',
      },
      {
        id: 3,
        userId: 3,
        bookId: 103,
        createdAt: '2023-05-12',
        stars: 3,
        description: 'Average, not what I expected.',
      },
    ])
  }, [])

  const truncateDescription = (description) => {
    return description.length > 25
      ? description.substring(0, 25) + '...'
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
            <th className="px-4 py-2 font-medium text-gray-900">Stars</th>
            <th className="px-4 py-2 font-medium text-gray-900">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reviews.map((review, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-center text-gray-900">
                {review.id}
              </td>
              <td className="px-4 py-2 text-center text-gray-900">
                {review.userId}
              </td>
              <td className="px-4 py-2 text-center text-gray-900">
                {review.bookId}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {review.createdAt}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {review.stars}
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {truncateDescription(review.description)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reviews
