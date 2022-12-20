import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import {
  getPacksRequestType,
  packsAPI,
  postPackRequestType,
} from '../API/packsAPI'

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
type deletePackDataType = {
  packID: string
  params: Partial<getPacksRequestType>
}
export const deletePack = createAsyncThunk(
  'packs/delete',
  async (data: deletePackDataType, thunkApi) => {
    try {
      await packsAPI.deletePack(data.packID)
      thunkApi.dispatch(getPacks(data.params))
      return data.packID
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

export const postPack = createAsyncThunk(
  'packs/post',
  async (data: postPackRequestType, thunkApi) => {
    try {
      return await packsAPI.postPack(data)
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
