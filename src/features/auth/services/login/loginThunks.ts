import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { AppRootStateType } from '../../../../state/store'
import { loginPayload, loginAPI } from './loginAPI'
import { profileAPI, userUpdateData } from '../profile/profileAPI'

export const authMe = createAsyncThunk('login/fetchMe', async (_, thunkApi) => {
  try {
    const res = await loginAPI.me()
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
      const res = await loginAPI.login(data)
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
    const res = await loginAPI.logout()
    return res.data
  } catch (e) {
    handleAxiosError(e, thunkApi.dispatch)
    if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
      thunkApi.dispatch(authMe())
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
      const res = await profileAPI.updateUser(user)
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
