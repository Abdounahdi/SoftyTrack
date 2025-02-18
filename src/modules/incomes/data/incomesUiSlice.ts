import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createFormOpen: false,
}

const incomesUiSlice = createSlice({
  name: 'incomesUiState',
  initialState , 
  reducers:{
    setCreateForm:(state , action )=>{
      state.createFormOpen = !state.createFormOpen
    }
  }
})

export const {setCreateForm } = incomesUiSlice.actions

export default incomesUiSlice.reducer
