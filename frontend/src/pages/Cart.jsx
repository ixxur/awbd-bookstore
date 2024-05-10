import { useState } from 'react'
import Navigation from '../components/landing/navigation'
import Footer from '../components/landing/footer'
import Breadcrumbs from '../components/cart/breadcrumbs'
import CartItems from '../components/cart/CartItems'
import AddressForm from '../components/cart/AddressForm'
import PaymentForm from '../components/cart/PaymentForm'

function Cart() {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="w-full h-full container mx-auto">
        <Navigation />
        <Breadcrumbs />

        <div className="h-3/4 w-full">
          {step === 1 && <CartItems onNext={handleNextStep} />}
          {step === 2 && (
            <AddressForm onNext={handleNextStep} onBack={handlePreviousStep} />
          )}
          {step === 3 && <PaymentForm onBack={handlePreviousStep} />}
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Cart
