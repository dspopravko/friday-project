import { createAsyncThunk } from '@reduxjs/toolkit'
import { packsAPI } from '../API/packsAPI'
import { PacksPageParamsType, PackType, PostPackType } from '../API/types'
import { thunkTryCatch } from '../../../api/thunkTryCatch'

export const getPacks = createAsyncThunk(
  'packs/get',
  async (data: Partial<PacksPageParamsType>, thunkApi) => {
    return thunkTryCatch(thunkApi, async () =>
      packsAPI.getPacks({ pageCount: 10, ...data })
    )
  }
)

type deletePackDataType = {
  packID: string
  params: Partial<PacksPageParamsType>
}

export const deletePack = createAsyncThunk(
  'packs/delete',
  async (data: deletePackDataType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      await packsAPI.deletePack(data.packID)
      thunkApi.dispatch(getPacks(data.params))
      return data.packID
    })
  }
)

type postPackDataType = {
  postData: PostPackType
  params: Partial<PacksPageParamsType>
}

export const postPack = createAsyncThunk(
  'packs/post',
  async (data: postPackDataType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await packsAPI.postPack(data.postData)
      thunkApi.dispatch(getPacks(data.params))
      return res.data
    })
  }
)

type updatePackDataType = {
  postData: Partial<PackType> & { _id: string }
  params: Partial<PacksPageParamsType>
}

export const updatePack = createAsyncThunk(
  'packs/put',
  async (data: updatePackDataType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await packsAPI.updatePack(data.postData)
      thunkApi.dispatch(getPacks(data.params))
      return res.data
    })
  }
)
