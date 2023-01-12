import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signUp } from './signUpThunk'

const initialState = {
  registered: false,
  email: '',
  errors: '',
}

const signUpSlice = createSlice({
  name: 'reg',
  initialState: initialState,
  reducers: {
    setReg(state, action: PayloadAction<boolean>) {
      state.registered = action.payload
    },
    reset(state) {
      state.registered = false
      state.errors = ''
      state.email = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.registered = true
      state.email = action.payload.email
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = JSON.stringify(action.payload)
    })
  },
})

export const regReducer = signUpSlice.reducer
export const signUpActions = signUpSlice.actions
