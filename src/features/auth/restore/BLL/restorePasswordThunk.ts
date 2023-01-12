import { createAsyncThunk } from '@reduxjs/toolkit'
import { restoreAPI, restorePasswordPayloadType } from '../API/restoreAPI'
import { resPassActions } from './restorePasswordSlice'
import { thunkTryCatch } from '../../../../api/thunkTryCatch'

export const restorePassword = createAsyncThunk(
  'auth/restorePasswordSlice',
  async (data: restorePasswordPayloadType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await restoreAPI.restorePassword(data)
      thunkApi.dispatch(resPassActions.setRestoreEmailValue(data.email))
      return res.data
    })
  }
)
