import { createAsyncThunk } from '@reduxjs/toolkit'
import { profileAPI, updateProfilePropsType } from '../API/profileAPI'
import { authMe } from '../../login/BLL/loginThunks'
import { thunkTryCatch } from '../../../../services/API/thunkTryCatch'

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data: updateProfilePropsType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await profileAPI.updateUser(data)
      thunkApi.dispatch(authMe())
      return res.data
    })
  }
)