import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { cardsAPI, getCardsRequestType } from '../API/cardsAPI'

export const getCards = createAsyncThunk(
  'cards/get',
  async (data: Partial<getCardsRequestType>, thunkApi) => {
    try {
      return await cardsAPI.getCards(data)
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
