import { UserType } from '../../users/API/types'
import { createSlice } from '@reduxjs/toolkit'
import { getUser } from './userThunk'

const initialState = {
  user: {} as UserType,
  pending: false,
  errors: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetUser(state) {
      state.user = {} as UserType
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
