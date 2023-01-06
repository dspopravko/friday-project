import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkTryCatch } from '../../../api/thunkTryCatch'
import { userAPI } from '../API/userAPI'
import { getUserParamsType } from '../API/types'

export const getUser = createAsyncThunk(
  'user/get-user',
  async (params: getUserParamsType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await userAPI.getUser(params)
      return res.data
    })
  }
)
