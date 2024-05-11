import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../../store/user'
import SummaryPanel from './summary-panel'

function AddressForm({ onNext, onBack }) {
  const { user, updateUserAddress } = useUserStore()

  const [address, setAddress] = useState({
    country: user?.address?.country || '',
    city: user?.address?.city || '',
    street: user?.address?.street || '',
    number: user?.address?.number || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (
      !address.country ||
      !address.city ||
      !address.street ||
      !address.number
    ) {
      toast.error('Please fill in all fields')
      return
    }
    updateUserAddress(address)
    onNext()
  }

  useEffect(() => {
    if (user?.address) {
      setAddress({
        country: user.address.country,
        city: user.address.city,
        street: user.address.street,
        number: user.address.number,
      })
    }
  }, [user?.address])

  return (
    <div className="h-full container mx-auto">
      <section className="h-3/4 flex w-full">
        <div className="w-full py-8 px-4 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <form className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                />
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                />
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  placeholder="Street"
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                />
                <input
                  type="text"
                  name="number"
                  value={address.number}
                  onChange={handleChange}
                  placeholder="House/Building Number"
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                />
              </form>
            </div>

            <SummaryPanel
              onNext={handleFormSubmit}
              onBack={onBack}
              nextLabel="Next Step"
              backLabel="Back"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddressForm
