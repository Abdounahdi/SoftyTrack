import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IQuery, ITodo } from './todoTypes'
import { getAllTodos, getTodo } from './todoThunk'

export interface TodoState {
  status: string
  error: string | null
  query: IQuery
  todos: ITodo[] | null
  todo: ITodo | null
}

const initialState: TodoState = {
  status: 'idle',
  error: null,
  query: {
    page: 1,
    limit: 10,
  },
  todos: null,
  todo: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoQuery: (state, action) => {
      const { page, limit } = action.payload
      state.query.page = page
      state.query.limit = limit
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(
      getAllTodos.fulfilled,
      (state, action: PayloadAction<{ data: ITodo[]; total: number }>) => {
        state.todos = action.payload.data
        state.query.total = action.payload.total
        state.status = 'succeeded'
      }
    )
    builder.addCase(getAllTodos.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload
      state.status = 'failed'
    })

    builder.addCase(getTodo.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(getTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
      state.todo = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(getTodo.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload
      state.status = 'failed'
    })
  },
})

export const { setTodoQuery } = todoSlice.actions

export default todoSlice.reducer
