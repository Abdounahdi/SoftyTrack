import { Suspense } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SideBar from '../../components/SideBar/SideBar'
interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="shared_main_layout">
      <SideBar />

      <div className="shared_main_layout_container">
        <Navbar />
        <div className="shared_main_layout_container_outlet">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
