import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootStateType } from '../../../../state/store'
import { profileAPI, userUpdateData } from './profileAPI'
import { loginPayload } from '../../login/services/loginAPI'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { authMe } from '../../login/services/loginThunks'

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (
    data: { name?: string; avatar?: string; password: string },
    thunkApi
  ) => {
    const state = thunkApi.getState() as AppRootStateType
    try {
      const user: userUpdateData & loginPayload = {
        avatar: data.avatar || state.profile.user.avatar,
        password: data.password,
        email: state.profile.user.email,
        name: data.name || state.profile.user.name,
      }
      const res = await profileAPI.updateUser(user)
      thunkApi.dispatch(authMe())
      return res.data
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data.error)
      } else {
        throw e
      }
    }
  }
)
