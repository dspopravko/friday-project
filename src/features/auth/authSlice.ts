import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from './services/auth-api'
import { authPayload } from './services/models/auth-payload'
import { handleAxiosError } from '../../services/error-notification'
import { AxiosError } from 'axios'

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

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.user = { ...state.user, ...action.payload }
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
})

export const authMe = createAsyncThunk(
  'auth/me',
  async (arg, { dispatch, getState }) => {
    const state = getState() as { auth: typeof initialState }
    if (state.auth.isFetching) {
      return
    }
    try {
      dispatch(authSlice.actions.setFetching(true))
      await authApi.me()
      dispatch(authSlice.actions.setAuth(true))
    } catch (e) {
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        dispatch(authSlice.actions.setAuth(false))
      }
      handleAxiosError(e, dispatch) // возможно нам не нужна обработка ошибок для me запроса, зачем нам нотификации при запуске приложения
    } finally {
      dispatch(authSlice.actions.setFetching(false))
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (payload: authPayload, { dispatch, getState }) => {
    const state = getState() as { auth: typeof initialState }
    if (state.auth.isFetching) {
      return
    }
    try {
      dispatch(authSlice.actions.setFetching(true))
      const res = await authApi.login(payload)
      dispatch(authSlice.actions.setAuth(true))
      const user: userType = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        publicCardPacksCount: res.data.publicCardPacksCount,
      }
      dispatch(authSlice.actions.setUser(user))
    } catch (e) {
      handleAxiosError(e, dispatch)
    } finally {
      dispatch(authSlice.actions.setFetching(false))
    }
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (args, { dispatch, getState }) => {
    const state = getState() as { auth: typeof initialState }
    if (state.auth.isFetching) {
      return
    }
    try {
      dispatch(authSlice.actions.setFetching(true))
      await authApi.logout()
      dispatch(authSlice.actions.setAuth(false))
    } catch (e) {
      handleAxiosError(e, dispatch)
    } finally {
      dispatch(authSlice.actions.setFetching(false))
    }
  }
)

export const authReducer = authSlice.reducer

export type AppReducerStateType = typeof initialState
export const appReducer = authSlice.reducer
