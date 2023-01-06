import { UserType } from '../../users/API/types'
import { createSlice } from '@reduxjs/toolkit'
import { getUser } from './userThunk'

const initialState = {
  user: {} as UserType,
  pending: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.pending = false
      state.user = action.payload.user
    })
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
