import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { AppRootStateType } from '../../../../state/store'
import { loginPayload, loginApi } from './login-api'
import { profileApi, userUpdateData } from '../profile/profile-api'
import { newPasswordApi } from '../newPassword/newPassword-api'
import { restoreApi } from '../restore/restore-api'

export const authMe = createAsyncThunk('login/fetchMe', async (_, thunkApi) => {
  try {
    const res = await loginApi.me()
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
  'login/login',
  async (data: loginPayload, thunkApi) => {
    try {
      const res = await loginApi.login(data)
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
export const logout = createAsyncThunk('login/logout', async (_, thunkApi) => {
  try {
    const res = await loginApi.logout()
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
  'login/updateProfile',
  async (
    data: { name?: string; avatar?: string; password: string },
    thunkApi
  ) => {
    const state = thunkApi.getState() as AppRootStateType
    try {
      const user: userUpdateData & loginPayload = {
        avatar: data.avatar || state.auth.user.avatar,
        password: data.password,
        email: state.auth.user.email,
        name: data.name || state.auth.user.name,
      }
      const res = await profileApi.updateUser(user)
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
  'login/setNewPassword', //наверное стоит вынести в отдельный slice, добавить в него состояние для редиректа на логин после успешного запроса
  async (data: { password: string; resetPasswordToken: string }, thunkApi) => {
    try {
      const res = await newPasswordApi.setNewPassword(data)
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
  'login/restorePassword', //наверное стоит вынести в отдельный slice, добавить в него состояние для редиректа на логин после успешного запроса
  async (data: { email: string; from: string; message: string }, thunkApi) => {
    try {
      const res = await restoreApi.restorePassword(data)
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
