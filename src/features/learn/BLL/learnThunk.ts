import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { getAllCardsType, learnAPI, SetGradeType } from '../API/learnAPI'
import { handleAxiosError } from '../../../services/error-notification'

export const getAllCards = createAsyncThunk(
  'learn/getAll',
  async (data: getAllCardsType, thunkApi) => {
    try {
      const res = await learnAPI.getAllCards(data)
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

export const setGrade = createAsyncThunk(
  'learn/setGrade',
  async (data: SetGradeType, thunkApi) => {
    try {
      const res = await learnAPI.setGrade(data)
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
