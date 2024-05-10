import Breadcrumbs from '../components/cart/breadcrumbs'
import Footer from '../components/landing/footer'
import Navigation from '../components/landing/navigation'

function Cart() {
  return (
    <section className="w-screen h-screen bg-gray-50">
      <div className="h-full container mx-auto">
        <Navigation />

        <Breadcrumbs />

        <section className="px-4 mt-4 h-4/6 w-full">hh</section>

        <Footer />
      </div>
    </section>
  )
}

export default Cart
