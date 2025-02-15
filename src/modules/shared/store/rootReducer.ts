import { combineReducers } from '@reduxjs/toolkit'
import { sharedsPersistedReducer } from './persist/sharedPersist'
import { api } from './services/api'
import authReducer from '../../auth/data/authSlice'
import todosReducer from '../../todos/data/todoSlice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  shared: sharedsPersistedReducer,
  auth: authReducer,
  todos: todosReducer,
})

export default rootReducer
