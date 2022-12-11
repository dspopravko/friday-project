import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authSlice } from '../features/auth/authSlice'

export enum appStatus {
  loading,
  idle,
}

export type errorType = string | null

const initialState = {
  status: appStatus.loading as appStatus,
  error: null as errorType,
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: appStatus }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: errorType }>) {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authSlice.actions.setAuth, (state) => {
      state.status = appStatus.idle
    })
  },
})

export type AppReducerStateType = typeof initialState
export const appReducer = appSlice.reducer
