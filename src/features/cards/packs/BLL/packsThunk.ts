import { controlParams } from './../VIEW/PacksTableControls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { getPacksRequestType, packsAPI } from '../API/packsAPI'

export const getPacks = createAsyncThunk(
  'packs/get',
  async (data: Partial<getPacksRequestType>, thunkApi) => {
    try {
      return await packsAPI.getPacks(data)
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
export const deletePack = createAsyncThunk(
  'packs/delete',
  async (data: string, thunkApi) => {
    try {
      const res = await packsAPI.deletePack(data)
      const res2 = getPacks(controlParams)
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
