import { createSlice } from '@reduxjs/toolkit'
import { UsersPageType, UserType } from '../API/types'
import { getUsers } from './usersThunk'

const initialState = {
  users: [] as UserType[],
  usersPage: {} as UsersPageType,
  pending: true,
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.pending = false
      state.users = action.payload.users
      state.usersPage = action.payload.usersPage
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
export const usersActions = usersSlice.actions
