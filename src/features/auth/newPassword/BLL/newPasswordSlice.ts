import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPassword } from './newPasswordThunk'

const initialState = {
  isFetching: false,
  isSet: false,
  errors: '',
}

export const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState: initialState,
  reducers: {
    setRestorePassword(state, action: PayloadAction<boolean>) {
      state.isSet = action.payload
    },
    reset(state) {
      state.isFetching = false
      state.isSet = false
      state.errors = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newPassword.fulfilled, (state) => {
      state.isSet = true
      state.isFetching = false
    })
    builder.addCase(newPassword.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(newPassword.rejected, (state, action) => {
      state.errors = JSON.stringify(action.payload)
      state.isFetching = false
    })
  },
})

export const newPasswordReducer = newPasswordSlice.reducer
