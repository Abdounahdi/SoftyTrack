import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageSize: 5,
  currentPage: 1,
  selectedRows: [],
  createFormIsOpen: false,
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
    setCreateFormIsOpen: (state) => {
      state.createFormIsOpen = !state.createFormIsOpen
    },
  },
})

export const { setCurrentPage, setPageSize, setSelectedRows, setCreateFormIsOpen } =
  trainingsSlice.actions

export default trainingsSlice.reducer
