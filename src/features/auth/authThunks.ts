import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from './services/auth-api'
import { handleAxiosError } from '../../services/error-notification'
import { AxiosError } from 'axios'
import { authPayload } from './services/models/auth-payload'

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
