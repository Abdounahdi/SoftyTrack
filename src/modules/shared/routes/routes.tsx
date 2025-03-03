import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'
import trainingRoutes from '../../trainings/routes/routes'
import categoriesRoutes from '../../categories/routes/routes'
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
  ...trainingRoutes,
  ...categoriesRoutes,
]

export default routes
