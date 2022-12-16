import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { loginAPI, loginPayload } from './loginAPI'

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
