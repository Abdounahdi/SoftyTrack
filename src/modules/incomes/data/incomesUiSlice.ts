import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showColumnsOptions:false , 
}

const incomesUiSlice = createSlice({
  name: 'incomesUi',
  initialState , 
  reducers:{
    setShowColumnsOptions:(state,action)=>{
      state.showColumnsOptions = !state.showColumnsOptions
    }
  }
})

export const { setShowColumnsOptions } = incomesUiSlice.actions

export default incomesUiSlice.reducer
