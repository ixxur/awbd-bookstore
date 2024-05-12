import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const cleanInput = (input) => {
    return input.replace(/[\s-.]+/g, '')
  }

  const handleFirstNameChange = (event) => {
    setFirstName(cleanInput(event.target.value))
  }

  const handleLastNameChange = (event) => {
    setLastName(cleanInput(event.target.value))
  }

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirmation
    ) {
      toast.error('Please fill in all fields.')
      return
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email address.')
      return
    }

    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match.')
      return
    }

    const username = `${firstName}${lastName}`

    const dataToSend = {
      email,
      password,
      username,
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error('Failed to register. Please try again.')
      }

      toast.success(
        'Registration successful! You will be redirected to login page!'
      )

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link to="/">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to SquidBooks 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </Link>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to SquidBooks 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 p-1.5 w-full rounded-md border-2 border-slate-100 bg-white text-sm text-gray-700 shadow-sm"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 p-1.5 w-full rounded-md border-2 border-slate-100 bg-white text-sm text-gray-700 shadow-sm"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {' '}
                  Email{' '}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 p-1.5 w-full rounded-md border-2 border-slate-100 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {' '}
                  Password{' '}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 p-1.5 w-full rounded-md border-2 border-slate-100 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 p-1.5 w-full rounded-md border-2 border-slate-100 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-gray-700 underline">
                    terms and conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-gray-700 underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-gray-700 underline">
                    Log in.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Register
