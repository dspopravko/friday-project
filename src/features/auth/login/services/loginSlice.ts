import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authMe, login, logout } from './loginThunks'

type userType = {
  _id: string
  email: string
  name: string
  publicCardPacksCount: number
}

const initialState = {
  isFetching: false,
  isAuth: false,
  user: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
  },
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.user = { ...state.user, ...action.payload }
    },
    resetUser(state) {
      state.user = {
        _id: '',
        name: '',
        email: '',
        publicCardPacksCount: 0,
        avatar: '',
      }
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
    setProfilePhoto(state, action: PayloadAction<string>) {
      state.user.avatar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authMe.fulfilled, (state, { payload }) => {
      state.isAuth = true
      state.isFetching = false
      state.user = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        publicCardPacksCount: payload.publicCardPacksCount,
        avatar: payload.avatar || state.user.avatar,
      }
    })
    builder.addCase(authMe.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(authMe.rejected, (state) => {
      loginSlice.caseReducers.resetUser(state)
      state.isFetching = false
      state.isAuth = false
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isFetching = false
      state.isAuth = true
      state.user = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        publicCardPacksCount: payload.publicCardPacksCount,
        avatar: payload.avatar || state.user.avatar,
      }
    })
    builder.addCase(login.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isFetching = false
      state.isAuth = false
    })
    builder.addCase(logout.fulfilled, (state) => {
      loginSlice.caseReducers.resetUser(state)
      state.isFetching = false
      state.isAuth = false
    })
    builder.addCase(logout.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(logout.rejected, (state) => {
      state.isFetching = false
    })
  },
})

export const authReducer = loginSlice.reducer

export type AppReducerStateType = typeof initialState
export const appReducer = loginSlice.reducer
