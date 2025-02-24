import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { VITE_APP_ENABLE_REDUX_DEVTOOLS } from '../../../config'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { api } from './services/api'

import rootReducer from './rootReducer'
import incomesApi from '../../incomes/data/supabaseApi/incomesApi'
import customersApi from '../../incomes/data/supabaseApi/customerApi'
import authApi from '../../auth/data/authApi'
import usersApi from '../../incomes/data/supabaseApi/usersApi'
import expensesApi from '../../expenses/data/supabaseApi/expensesApi'

export const store = configureStore({
  reducer: rootReducer,
  devTools: VITE_APP_ENABLE_REDUX_DEVTOOLS,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      api.middleware,
      incomesApi.middleware,
      customersApi.middleware,
      authApi.middleware,
      usersApi.middleware,
      expensesApi.middleware,
    ),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
