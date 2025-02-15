import SearchInput from '../SearchInput/SearchInput'
import UserProfile from '../UserProfile/UserProfile'

const Navbar = () => {
  return (
    <div className="shared_navbar_toggler">
      <SearchInput />
      <UserProfile />
    </div>
  )
}

export default Navbar
