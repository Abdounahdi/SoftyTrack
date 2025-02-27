import { HiArrowRightEndOnRectangle } from 'react-icons/hi2'
import { useLogoutMutation } from '../../data/authApi'
import { Navigate, useNavigate } from 'react-router'
import { useAppDispatch } from '../../../shared/store'
import { initialise } from '../../data/authSlice'

export default function Logout() {
  const [logout, { isLoding: isLogginOut }] = useLogoutMutation({})
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  function handleLogout() {
    logout()
    localStorage.clear()
    dispatch(initialise({ isAuthenticated: false, role: null, user: null }))
    navigate('/dashboard')
  }
  return (
    <button className="logout_btn" onClick={handleLogout}>
      <HiArrowRightEndOnRectangle />
    </button>
  )
}
