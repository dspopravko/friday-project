import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllCardsResponse,
  getAllCardsType,
  learnAPI,
  SetGradeType,
} from '../API/learnAPI'
import { thunkTryCatch } from '../../../api/thunkTryCatch'
import { RootAPIResponse } from '../../../api/types'
import { CardType } from '../../cards/API/types'

export const getAllCards = createAsyncThunk<
  getAllCardsResponse,
  getAllCardsType
>('learn/getAll', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await learnAPI.getAllCards(data)
    return res.data
  })
})

export const setGrade = createAsyncThunk<
  RootAPIResponse & { updatedGrade: CardType },
  SetGradeType
>('learn/setGrade', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await learnAPI.setGrade(data)
    return res.data
  })
})
