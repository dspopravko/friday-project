import { createAsyncThunk } from '@reduxjs/toolkit'
import { restoreAPI, restorePasswordPayloadType } from './restoreAPI'
import { restorePasswordSlice } from './restorePasswordSlice'
import { thunkTryCatch } from '../../../../services/API/thunkTryCatch'

export const restorePassword = createAsyncThunk(
  'auth/restorePasswordSlice',
  async (data: restorePasswordPayloadType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await restoreAPI.restorePassword(data)
      thunkApi.dispatch(
        restorePasswordSlice.actions.setRestoreEmailValue(data.email)
      )
      return res.data
    })
  }
)
