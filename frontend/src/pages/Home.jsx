import Banner from '../components/landing/banner'
import Categories from '../components/landing/categories'
import Content from '../components/landing/content'
import Reviews from '../components/landing/reviews'
import ProductCollection from '../components/landing/product-collection'
import Footer from '../components/landing/footer'

function Home() {
  return (
    <div className="w-screen bg-gray-50 flex flex-col items-center">
      <Banner />
      <Categories />
      <ProductCollection />
      <Content />
      <Reviews />
      <Footer />
    </div>
  )
}

export default Home
