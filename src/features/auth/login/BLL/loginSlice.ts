import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { authMe, login, logout } from './loginThunks'

const initialState = {
  isFetching: false,
  isAuth: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => {
        return initialState
      })
      .addMatcher(isAnyOf(authMe.fulfilled, login.fulfilled), (state) => {
        state.isAuth = true
      })
      .addMatcher(isAnyOf(authMe.rejected, login.rejected), (state) => {
        state.isAuth = false
      })
      .addMatcher(
        isAnyOf(authMe.pending, login.pending, logout.pending),
        (state) => {
          state.isFetching = true
        }
      )
      .addMatcher(
        isAnyOf(
          authMe.fulfilled,
          authMe.rejected,
          login.fulfilled,
          login.rejected,
          logout.rejected
        ),
        (state) => {
          state.isFetching = false
        }
      )
  },
})

export const loginReducer = loginSlice.reducer
export const loginActions = loginSlice.actions
