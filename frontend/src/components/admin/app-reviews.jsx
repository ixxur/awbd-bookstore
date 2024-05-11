import { useEffect, useState } from 'react'

function AppReviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setReviews([
      {
        id: 1,
        userId: 1,
        star: 5,
        description: 'Absolutely fantastic! Highly recommended for anyone.',
      },
      {
        id: 2,
        userId: 2,
        star: 4,
        description:
          'Good, but could be better. Had a few issues with the latest update.',
      },
      {
        id: 3,
        userId: 3,
        star: 3,
        description: 'Mediocre experience, not bad but not great either.',
      },
    ])
  }, [])

  const truncateDescription = (description) => {
    return description.length > 25
      ? `${description.substring(0, 25)}...`
      : description
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">User ID</th>
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
              <td className="px-4 py-2 text-center text-gray-700">
                {review.star}
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

export default AppReviews
