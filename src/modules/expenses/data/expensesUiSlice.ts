import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions: false,
  checkedListOfShownColumns: [],
  pageSize: 5,
  currentPage: 1,
}

const expensesUiSlice = createSlice({
  name: 'expensesUi',
  initialState,
  reducers: {
    setShowColumnsOptions: (state, action) => {
      state.showColumnsOptions = !state.showColumnsOptions
    },
    setCheckedListOfShownColumns: (state, action) => {
      state.checkedListOfShownColumns = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
})

export const { setShowColumnsOptions, setCheckedListOfShownColumns, setCurrentPage, setPageSize } =
  expensesUiSlice.actions

export default expensesUiSlice.reducer
