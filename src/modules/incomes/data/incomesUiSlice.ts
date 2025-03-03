import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions: false,
  checkedListOfShownColumns: [],
  pageSize: 5,
  currentPage: 1,
  selectedRows: [],
  slicesNumber: 0,
  showFilterOptions: false,
  filterOptions: [],
  searchQuery: '',
}

const incomesUiSlice = createSlice({
  name: 'incomesUi',
  initialState,
  reducers: {
    setShowColumnsOptionsIncomes: (state) => {
      state.showColumnsOptions = !state.showColumnsOptions
    },
    setCheckedListOfShownColumnsIncomes: (state, action) => {
      state.checkedListOfShownColumns = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload
    },
    setSlicesNumber: (state, action) => {
      state.slicesNumber = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setShowFilterOptions: (state) => {
      state.showFilterOptions = !state.showFilterOptions
    },
  },
})

export const {
  setShowColumnsOptionsIncomes,
  setCheckedListOfShownColumnsIncomes,
  setCurrentPage,
  setPageSize,
  setSelectedRows,
  setSlicesNumber,
  setShowFilterOptions,
  setFilterOptions,
  setSearchQuery,
} = incomesUiSlice.actions

export default incomesUiSlice.reducer
