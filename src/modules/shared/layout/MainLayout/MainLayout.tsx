import { Suspense } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SideBar from '../../components/SideBar/SideBar'
import { Toaster } from 'react-hot-toast'
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
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: '#fff',
                color: '#252525',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: 'green',
                  secondary: 'white',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
