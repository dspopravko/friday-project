import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginSlice } from '../features/auth/login/services/loginSlice'

export enum appStatus {
  loading,
  idle,
}

export type errorType = string | null

const initialState = {
  status: appStatus.idle as appStatus,
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
    builder.addCase(loginSlice.actions.setAuth, (state) => {
      state.status = appStatus.idle
    })
  },
})

export type AppReducerStateType = typeof initialState
export const appReducer = appSlice.reducer
