import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth)

  return isAuthenticated ? (
    role === 'admin' ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/incomes" />
    )
  ) : (
    children
  )
}

export default GuestGuard
