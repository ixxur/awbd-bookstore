import ProductItem from './product-item'

function ProductList({ products }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  )
}

export default ProductList
