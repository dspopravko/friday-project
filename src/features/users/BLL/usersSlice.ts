import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../API/types'
import { getUsers } from './usersThunk'

const initialState = {
  users: [] as UserType[],
  pending: false,
  errors: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.pending = false
      state.users = action.payload.users
    })
  },
})

export const usersReducer = usersSlice.reducer
