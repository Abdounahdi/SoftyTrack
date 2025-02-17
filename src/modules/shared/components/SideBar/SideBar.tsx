import Logo from '../Logo/Logo'
import MainNav from '../MainNav/MainNav'
import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiOutlineHome,
} from 'react-icons/hi2'
import SideBarToggleIcon from '../../assets/icons/sideBarIcon.svg'
import { useState } from 'react'

export default function SideBar() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(true)
  return (
    <div
      className={`side_bar_container ${sideBarIsOpen ? 'side_bar_container_open' : 'side_bar_container_close'}`}
    >
      <Logo isOpen={sideBarIsOpen} />
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
        isOpen={sideBarIsOpen}
      />
      <img
        className={`side_bar_toggle ${sideBarIsOpen ? 'side_bar_toggle_oppened' : ''}`}
        src={SideBarToggleIcon}
        onClick={() => setSideBarIsOpen((state) => !state)}
      />
    </div>
  )
}
