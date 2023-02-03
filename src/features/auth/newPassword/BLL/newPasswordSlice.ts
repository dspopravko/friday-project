import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { newPassword } from './newPasswordThunk'
import { logout } from '../../login/BLL/loginThunks'

const initialState = {
  isFetching: false,
  isSet: false,
  errors: '',
}

const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState: initialState,
  reducers: {
    setRestorePassword(state, action: PayloadAction<boolean>) {
      state.isSet = action.payload
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => {
        return initialState
      })
      .addCase(newPassword.fulfilled, (state) => {
        state.isSet = true
      })
      .addCase(newPassword.pending, (state) => {
        state.isFetching = true
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.errors = JSON.stringify(action.payload)
      })
      .addMatcher(
        isAnyOf(newPassword.rejected, newPassword.fulfilled),
        (state) => {
          state.isFetching = false
        }
      )
  },
})

export const newPasswordReducer = newPasswordSlice.reducer
export const newPasswordActions = newPasswordSlice.actions
