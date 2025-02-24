import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions: false,
  checkedListOfShownColumns: [],
  pageSize: 5,
  currentPage: 1,
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
  },
})

export const {
  setShowColumnsOptionsIncomes,
  setCheckedListOfShownColumnsIncomes,
  setCurrentPage,
  setPageSize,
} = incomesUiSlice.actions

export default incomesUiSlice.reducer
