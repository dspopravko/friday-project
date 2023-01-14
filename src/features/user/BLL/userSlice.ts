import { UserType } from '../../users/API/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUser } from './userThunk'

const initialState = {
  user: {} as UserType,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserProperty(state, action: PayloadAction<Partial<UserType>>) {
      state.user = action.payload as UserType
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
