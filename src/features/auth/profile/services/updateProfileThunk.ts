import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootStateType } from '../../../../state/store'
import { profileAPI, userUpdateData } from './profileAPI'
import { loginPayload } from '../../login/services/loginAPI'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'

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
