import Logo from '../Logo/Logo'
import MainNav from '../MainNav/MainNav'
import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiOutlineBanknotes,
  HiOutlineFolderOpen,
  HiOutlineHome,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import SideBarToggleIcon from '../../assets/icons/sideBarIcon.svg'
import { useAppSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { SharedSwitchValue } from '../../store/slices/sharedSlice'

export default function SideBar() {
  const dispatch = useDispatch()
  const { isSidebarCollapsed } = useAppSelector((state) => state.shared)

  function setSideBar() {
    dispatch(SharedSwitchValue({ key: 'isSidebarCollapsed', value: !isSidebarCollapsed }))
  }

  return (
    <div
      className={`side_bar_container ${isSidebarCollapsed ? 'side_bar_container_open' : 'side_bar_container_close'}`}
    >
      <Logo isOpen={isSidebarCollapsed} />
      <MainNav
        options={[
          {
            name: 'Home',
            icon: <HiOutlineHome />,
            to: '/dashboard',
            guard: 'admin',
          },
          {
            name: 'Incomes',
            icon: <HiOutlineArrowDownOnSquare />,
            to: '/incomes',
            guard: 'user admin',
          },
          {
            name: 'Expenses',
            icon: <HiOutlineArrowUpOnSquare />,
            to: '/expenses',
            guard: 'user admin',
          },
          {
            name: 'Trainings',
            icon: <HiOutlineFolderOpen />,
            to: '/fdsdfsa',
            guard: 'user admin',
          },
          {
            name: 'Categories',
            icon: <HiOutlineBanknotes />,
            to: '/dfsaddfas',
            guard: 'user admin',
          },
          {
            name: 'Users',
            icon: <HiOutlineUserGroup />,
            to: '/fdsadfsad',
            guard: 'admin',
          },
        ]}
        isOpen={isSidebarCollapsed}
      />
      <img
        className={`side_bar_toggle ${isSidebarCollapsed ? 'side_bar_toggle_oppened' : ''}`}
        src={SideBarToggleIcon}
        onClick={() => setSideBar()}
      />
    </div>
  )
}
