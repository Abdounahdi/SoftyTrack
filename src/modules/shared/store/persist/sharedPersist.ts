import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import sharedReducer from '../slices/sharedSlice'

const sharedPersistConfig = {
  key: 'shared',
  storage,
  whitelist: [
    'isSidebarCollapsed',
    'columnsIncomes',
    'columnsExpenses',
    'pageSizeIncomes',
    'pageSizeExpenses',
  ],
}

export const sharedsPersistedReducer = persistReducer(sharedPersistConfig, sharedReducer)
