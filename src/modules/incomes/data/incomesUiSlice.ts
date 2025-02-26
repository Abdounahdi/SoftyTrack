import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions: false,
  checkedListOfShownColumns: [],
  pageSize: 5,
  currentPage: 1,
  selectedRows: [],
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
  },
})

export const {
  setShowColumnsOptionsIncomes,
  setCheckedListOfShownColumnsIncomes,
  setCurrentPage,
  setPageSize,
  setSelectedRows
} = incomesUiSlice.actions

export default incomesUiSlice.reducer
