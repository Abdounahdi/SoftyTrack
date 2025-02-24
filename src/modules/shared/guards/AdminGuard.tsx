import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface AdminGuardProps {
  children: React.ReactNode
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { role } = useAppSelector((state) => state.auth)

  return role === 'admin' ? children : <Navigate to="/login" />
}

export default AdminGuard
