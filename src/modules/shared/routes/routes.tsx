import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'
import todosRoutes from '../../todos/routes/routes'
import todosRTKRoutes from '../../todosRtk/routes/routes'
import incomesRoutes from '../../incomes/routes/routes'
import expensesRoutes from '../../expenses/routes/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  // ...todosRoutes,
  // ...todosRTKRoutes,
  ...incomesRoutes,
  ...expensesRoutes,
]

export default routes
