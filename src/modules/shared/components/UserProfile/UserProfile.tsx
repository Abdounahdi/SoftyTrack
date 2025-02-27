import { HiOutlineUser } from 'react-icons/hi2'
import Logout from '../../../auth/components/Logout/Logout'

export default function UserProfile() {
  return (
    <div className="user_profile_container">
      <button className="user_profile_btn">
        <HiOutlineUser />
      </button>
      <Logout/>
    </div>
  )
}
