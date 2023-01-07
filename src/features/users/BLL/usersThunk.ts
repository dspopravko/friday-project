import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkTryCatch } from '../../../api/thunkTryCatch'
import { usersAPI } from '../API/usersAPI'
import { UsersPageParamsType, UsersPageType, UserType } from '../API/types'

export const getUsers = createAsyncThunk<
  { users: UserType[]; usersPage: UsersPageType },
  Partial<UsersPageParamsType>
>('users/get-users', async (params, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    return await usersAPI.getUsers({ pageCount: 6, ...params })
  })
})
