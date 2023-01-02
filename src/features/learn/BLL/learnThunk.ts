import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCardsType, learnAPI, SetGradeType } from '../API/learnAPI'
import { thunkTryCatch } from '../../../api/thunkTryCatch'

export const getAllCards = createAsyncThunk(
  'learn/getAll',
  async (data: getAllCardsType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await learnAPI.getAllCards(data)
      return res.data
    })
  }
)

export const setGrade = createAsyncThunk(
  'learn/setGrade',
  async (data: SetGradeType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await learnAPI.setGrade(data)
      return res.data
    })
  }
)
