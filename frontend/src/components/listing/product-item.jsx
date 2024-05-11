import { Link } from 'react-router-dom'

function ProductItem({ product }) {
  return (
    <li>
      <Link to={`/books/${product.id}`} className="group block overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
        <div className="relative bg-gray-50 pt-3">
          <h2 className="text-lg text-gray-800 group-hover:underline group-hover:underline-offset-4">
            {product.title}
          </h2>
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {product.author}
          </h3>
          <p className="mt-2">
            <span className="tracking-wider text-gray-900">
              € {product.price}
            </span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default ProductItem
