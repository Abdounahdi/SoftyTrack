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
  incomesUiSlice.actions

export default incomesUiSlice.reducer
