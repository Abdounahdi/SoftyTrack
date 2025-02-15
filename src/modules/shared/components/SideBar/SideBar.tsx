import Logo from '../Logo/Logo'
import MainNav from '../MainNav/MainNav'
import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiOutlineHome,
} from 'react-icons/hi2'

export default function SideBar() {
  return (
    <div className="side_bar_container">
      <Logo />
      <MainNav
        options={[
          {
            name: 'Home',
            icon: <HiOutlineHome />,
            to: '/dashboard',
          },
          {
            name: 'Incomes',
            icon: <HiOutlineArrowDownOnSquare />,
            to: '/incomes',
          },
          {
            name: 'Expenses',
            icon: <HiOutlineArrowUpOnSquare />,
            to: '/expenses',
          },
        ]}
      />
    </div>
  )
}
