import { Navigate, useLocation } from 'react-router-dom'
import useUserStore from '../store/user'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
