import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageSize: 5,
  currentPage: 1,
  selectedRows: [],
  createFormIsOpen: false,
  searchQuery: '',
}

const categoriesSlice = createSlice({
  name: 'categories',
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
    setSearchQuery: (state , action) => {
      console.log("hie")
      state.searchQuery = action.payload
    },
  },
})

export const { setCurrentPage, setPageSize, setSelectedRows, setCreateFormIsOpen, setSearchQuery } =
  categoriesSlice.actions

export default categoriesSlice.reducer
