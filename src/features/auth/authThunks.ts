import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi, userUpdateData } from './services/auth-api'
import { handleAxiosError } from '../../services/error-notification'
import { AxiosError } from 'axios'
import { authPayload } from './services/models/auth-payload'
import { AppRootStateType } from '../../state/store'

export const authMe = createAsyncThunk('auth/fetchMe', async (_, thunkApi) => {
  try {
    const res = await authApi.me()
    return res.data
  } catch (e) {
    if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
      return thunkApi.rejectWithValue(e.response?.data)
    } else {
      throw e
    }
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (data: authPayload, thunkApi) => {
    try {
      const res = await authApi.login(data)
      return res.data
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data)
      } else {
        throw e
      }
    }
  }
)
export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const res = await authApi.logout()
    return res.data
  } catch (e) {
    handleAxiosError(e, thunkApi.dispatch)
    if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
      return thunkApi.rejectWithValue(e.response?.data)
    } else {
      throw e
    }
  }
})
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    data: { name?: string; avatar?: string; password: string },
    thunkApi
  ) => {
    const state = thunkApi.getState() as AppRootStateType
    try {
      const user: userUpdateData & authPayload = {
        avatar: data.avatar || state.auth.user.avatar,
        password: data.password,
        email: state.auth.user.email,
        name: data.name || state.auth.user.name,
      }
      const res = await authApi.updateUser(user)
      return res.data
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data)
      } else {
        throw e
      }
    }
  }
)
export const setNewPassword = createAsyncThunk(
  'auth/setNewPassword', //наверное стоит вынести в отдельный slice, добавить в него состояние для редиректа на логин после успешного запроса
  async (data: { password: string; resetPasswordToken: string }, thunkApi) => {
    try {
      const res = await authApi.setNewPassword(data)
      return res.data
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data)
      } else {
        throw e
      }
    }
  }
)
export const restorePassword = createAsyncThunk(
  'auth/restorePassword', //наверное стоит вынести в отдельный slice, добавить в него состояние для редиректа на логин после успешного запроса
  async (data: { email: string; from: string; message: string }, thunkApi) => {
    try {
      const res = await authApi.restorePassword(data)
      return res.data
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data)
      } else {
        throw e
      }
    }
  }
)
