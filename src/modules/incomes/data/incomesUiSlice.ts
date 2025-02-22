import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions: false,
  checkedListOfShownColumns: [],
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
  },
})

export const { setShowColumnsOptions, setCheckedListOfShownColumns } = incomesUiSlice.actions

export default incomesUiSlice.reducer
