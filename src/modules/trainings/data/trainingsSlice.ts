import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageSize: 5,
  currentPage: 1,
  selectedRows: [],
}

const trainingsSlice = createSlice({
  name: 'trainings',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload
    },
  },
})

export const {
  setCurrentPage,
  setPageSize,
  setSelectedRows
} = trainingsSlice.actions

export default trainingsSlice.reducer
