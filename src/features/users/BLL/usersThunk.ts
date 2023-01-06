import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkTryCatch } from '../../../api/thunkTryCatch'
import { usersAPI } from '../API/usersAPI'
import { UsersPageParamsType } from '../API/types'

export const getUsers = createAsyncThunk(
  'users/get-users',
  async (params: Partial<UsersPageParamsType>, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      return await usersAPI.getUsers({ pageCount: 6, ...params })
    })
  }
)
