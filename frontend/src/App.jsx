import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SearchProducts from './pages/SearchProducts'
import Confirmation from './pages/Confirmation'

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books/:id" element={<Product />} />
        <Route path="/books" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/books/search/" element={<SearchProducts />} />
        <Route path="/order/:id/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  )
}

export default App
