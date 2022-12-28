import { createAsyncThunk } from '@reduxjs/toolkit'
import { regApi, RegType } from './signUpAPI'
import { thunkTryCatch } from '../../../../services/API/thunkTryCatch'

export const signUp = createAsyncThunk(
  'auth/register',
  async (data: RegType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await regApi.reg(data)
      return res.data.addedUser
    })
  }
)
