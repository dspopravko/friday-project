import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { restorePassword } from './restorePasswordThunk'

const initialState = {
  isFetching: false,
  restored: false,
  errors: '',
  email: '',
}

const restorePasswordSlice = createSlice({
  name: 'restore',
  initialState: initialState,
  reducers: {
    setRestorePasswordState(state, action: PayloadAction<boolean>) {
      state.restored = action.payload
    },
    setRestoreEmailValue(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    reset(state) {
      state.isFetching = false
      state.restored = false
      state.errors = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restorePassword.fulfilled, (state) => {
      state.restored = true
      state.isFetching = false
    })
    builder.addCase(restorePassword.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(restorePassword.rejected, (state, action) => {
      state.errors = JSON.stringify(action.payload)
      state.isFetching = false
    })
  },
})

export const resPassReducer = restorePasswordSlice.reducer
export const resPassActions = restorePasswordSlice.actions
