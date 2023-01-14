import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authMe, login, logout } from './loginThunks'

const initialState = {
  isFetching: false,
  isAuth: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authMe.fulfilled, (state) => {
      state.isAuth = true
      state.isFetching = false
    })
    builder.addCase(authMe.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(authMe.rejected, (state) => {
      state.isFetching = false
      state.isAuth = false
    })
    builder.addCase(login.fulfilled, (state) => {
      state.isFetching = false
      state.isAuth = true
    })
    builder.addCase(login.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isFetching = false
      state.isAuth = false
    })
    builder.addCase(logout.fulfilled, () => {
      return initialState
    })
    builder.addCase(logout.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(logout.rejected, (state) => {
      state.isFetching = false
    })
  },
})

export const loginReducer = loginSlice.reducer
export const loginActions = loginSlice.actions
