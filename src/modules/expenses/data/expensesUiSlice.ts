import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions: false,
  checkedListOfShownColumns: [],
  pageSize: 5,
  currentPage: 1,
  selectedRows: [],
  showFilterOptions: false,
}

const expensesUiSlice = createSlice({
  name: 'expensesUi',
  initialState,
  reducers: {
    setShowColumnsOptionsExpenses: (state) => {
      state.showColumnsOptions = !state.showColumnsOptions
    },
    setCheckedListOfShownColumnsExpeneses: (state, action) => {
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
    setShowFilterOptions: (state) => {
      state.showFilterOptions = !state.showFilterOptions
    },
  },
})

export const {
  setShowColumnsOptionsExpenses,
  setCheckedListOfShownColumnsExpeneses,
  setCurrentPage,
  setPageSize,
  setSelectedRows,
  setShowFilterOptions,
} = expensesUiSlice.actions

export default expensesUiSlice.reducer
