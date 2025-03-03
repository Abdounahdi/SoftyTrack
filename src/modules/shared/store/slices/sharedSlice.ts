// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface SharedState {
//   isSidebarCollapsed: boolean
// }

const initialState = {
  isSidebarCollapsed: false,
  columnsIncomes: [],
  columnsExpenses: [],
  pageSizeIncomes: 5,
  pageSizeExpenses: 5,
}

// interface DataHandleChangeProps<T extends keyof SharedState> {
//   key: T
//   value: SharedState[T]
// }

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    SharedSwitchValue: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
  },
})

export default sharedSlice.reducer

export const { SharedSwitchValue } = sharedSlice.actions
