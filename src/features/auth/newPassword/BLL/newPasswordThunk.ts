import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  newPasswordAPI,
  setNewPasswordPayloadType,
} from '../API/newPasswordAPI'
import { thunkTryCatch } from '../../../../services/API/thunkTryCatch'

export const newPassword = createAsyncThunk(
  'auth/newPasswordSlice',
  async (data: setNewPasswordPayloadType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await newPasswordAPI.setNewPassword(data)
      return res.data
    })
  }
)
