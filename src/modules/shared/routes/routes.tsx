import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'
import todosRoutes from '../../todos/routes/routes'
import todosRTKRoutes from '../../todosRtk/routes/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...todosRoutes,
  ...todosRTKRoutes,
]

export default routes
