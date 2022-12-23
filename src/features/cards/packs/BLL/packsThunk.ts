import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { packsAPI } from '../API/packsAPI'
import { PackType, PacksPageParamsType, PostPackType } from '../API/types'

export const getPacks = createAsyncThunk(
  'packs/get',
  async (data: Partial<PacksPageParamsType>, thunkApi) => {
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
  params: Partial<PacksPageParamsType>
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

type postPackDataType = {
  postData: PostPackType
  params: Partial<PacksPageParamsType>
}
export const postPack = createAsyncThunk(
  'packs/post',
  async (data: postPackDataType, thunkApi) => {
    try {
      const res = await packsAPI.postPack(data.postData)
      thunkApi.dispatch(getPacks(data.params))
      return res
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
type updatePackDataType = {
  postData: Partial<PackType> & { _id: string }
  params: Partial<PacksPageParamsType>
}
export const updatePack = createAsyncThunk(
  'packs/put',
  async (data: updatePackDataType, thunkApi) => {
    try {
      const res = await packsAPI.updatePack(data.postData)
      thunkApi.dispatch(getPacks(data.params))
      console.log(res)
      return true
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
