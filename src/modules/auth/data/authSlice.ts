import { createSlice} from '@reduxjs/toolkit'
import { IUser } from './authTypes'

export interface AuthState {
  status: string
  isAuthenticated: boolean
  // isInitialised: boolean
  user: IUser | null
  error: string | null
  role: string | null
}

const initialState: AuthState = {
  status: 'idle',
  isAuthenticated: false,
  // isInitialised: false,
  user: null,
  error: null,
  role: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { isAuthenticated, user, role } = action.payload
      state.isAuthenticated = isAuthenticated
      state.role = role
      state.user = user
      // state.role = role
    },
    restore: (state) => {
      state.error = null
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(login.pending, (state) => {
  //     state.error = null
  //     state.status = 'loading'
  //   })
  //   builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
  //     // const { user } = action.payload
  //     // setTokens(accessToken, refreshToken)
  //     state.isAuthenticated = true
  //     state.user = action.payload
  //     state.status = 'succeeded'
  //   })
  //   builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
  //     state.error = action?.payload
  //     state.status = 'failed'
  //   })
  // },
})

export const { initialise, restore } = authSlice.actions

export default authSlice.reducer
