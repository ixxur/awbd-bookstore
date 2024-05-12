import { Link } from 'react-router-dom'

function ProductItem({ product }) {
  return (
    <li>
      <Link to={`/books/${product.id}`} className="group block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1714423718253-b1bd2d95ddd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={product.title}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
        <div className="relative bg-gray-50 pt-3">
          <h2 className="text-lg text-gray-800 group-hover:underline group-hover:underline-offset-4">
            {product.title}
          </h2>
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {product.author.name}
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
