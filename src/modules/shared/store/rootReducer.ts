import { combineReducers } from '@reduxjs/toolkit'
import { sharedsPersistedReducer } from './persist/sharedPersist'
import { api } from './services/api'
import authReducer from '../../auth/data/authSlice'
import todosReducer from '../../todos/data/todoSlice'
import incomesUiReducer from '../../incomes/data/incomesUiSlice'
import incomesApi from '../../incomes/data/supabaseApi/incomesApi'
import customersApi from '../../incomes/data/supabaseApi/customerApi'
import authApi from '../../auth/data/authApi'
import usersApi from '../../incomes/data/supabaseApi/usersApi'
import expensesApi from '../../expenses/data/supabaseApi/expensesApi'
import expensesUiReducer from '../../expenses/data/expensesUiSlice'
import trainingsApi from '../../trainings/data/supabase/trainingsApi'
import dashboardApi from '../../dashboard/data/supabase/dashboardApi'
import trainingsUiReducer from '../../trainings/data/trainingsSlice'
import categoriesUiReducer from '../../categories/data/categoriesSlice'
import categoriesApi from '../../categories/data/supabase/categoriesApi'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [incomesApi.reducerPath]: incomesApi.reducer,
  [customersApi.reducerPath]: customersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [expensesApi.reducerPath]: expensesApi.reducer,
  [trainingsApi.reducerPath]: trainingsApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  shared: sharedsPersistedReducer,
  auth: authReducer,
  todos: todosReducer,
  incomesUi: incomesUiReducer,
  expensesUi: expensesUiReducer,
  trainingsUi: trainingsUiReducer,
  categoriesUi: categoriesUiReducer,
})

export default rootReducer

// const object = [
//   {
//     id: 1,
//     created_at: '2025-02-16T00:05:17.089309+00:00',
//     date_created: '2020-02-16T00:05:17.0234+00:00',
//     payment_method: 'cash',
//     price: 2000,
//     total_slices: 2,
//     slice_count: 1,
//     reception_location: 'sousse-sahloul',
//     description: 'Nothing to say ',
//     training_id: 1,
//     cutomer_id: 1,
//     user: 'ali bnr',
//     customers: {
//       id: 1,
//       name: 'Abderrahmen Nahdi',
//       email: 'nahdi.abdo.2020@gmail.com',
//       phone: 27113828,
//       created_at: '2025-02-15T23:49:52.526682+00:00',
//     },
//     trainings: { id: 1, name: 'ReactJS', created_at: '2025-02-15T23:51:16.844078+00:00' },
//   },
// ]
