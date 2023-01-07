import { createAsyncThunk } from '@reduxjs/toolkit'
import { packsAPI } from '../API/packsAPI'
import {
  packsPageType,
  PacksPageParamsType,
  PackType,
  PostPackType,
} from '../API/types'
import { thunkTryCatch } from '../../../api/thunkTryCatch'
import { RootAPIResponse } from '../../../api/types'

export const getPacks = createAsyncThunk<
  { cardPacks: PackType[]; packsPage: packsPageType },
  Partial<PacksPageParamsType>
>('packs/get', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () =>
    packsAPI.getPacks({ pageCount: 10, ...data })
  )
})

type deletePackDataType = {
  packID: string
  params: Partial<PacksPageParamsType>
}

export const deletePack = createAsyncThunk<
  RootAPIResponse & { deletedCardsPack: PackType },
  deletePackDataType
>('packs/delete', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await packsAPI.deletePack(data.packID)
    thunkApi.dispatch(getPacks(data.params))
    return res
  })
})

type postPackDataType = {
  postData: PostPackType
  params: Partial<PacksPageParamsType>
}

export const postPack = createAsyncThunk<
  RootAPIResponse & { newCardsPack: PackType },
  postPackDataType
>('packs/post', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await packsAPI.postPack(data.postData)
    thunkApi.dispatch(getPacks(data.params))
    return res
  })
})

type updatePackDataType = {
  postData: Partial<PackType> & { _id: string }
  params: Partial<PacksPageParamsType>
}

export const updatePack = createAsyncThunk<
  RootAPIResponse & { updatedCardsPack: PackType },
  updatePackDataType
>('packs/put', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await packsAPI.updatePack(data.postData)
    thunkApi.dispatch(getPacks(data.params))
    return res
  })
})
