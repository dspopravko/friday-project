import { createSlice } from '@reduxjs/toolkit'
import { UsersResponseType, UserType } from '../API/types'
import { getUsers } from './usersThunk'

const initialState = {
  users: [] as UserType[],
  usersGeneral: {} as Omit<UsersResponseType, 'users'>,
  pending: true,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.pending = false
      state.users = action.payload.users
      state.usersGeneral = action.payload.usersGeneral
    })
    builder.addCase(getUsers.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getUsers.rejected, (state) => {
      state.pending = false
    })
  },
})

export const usersReducer = usersSlice.reducer
