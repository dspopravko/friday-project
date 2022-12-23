import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { cardsAPI } from '../API/cardsAPI'
import { CardsPageParamsType, postCardType } from '../API/types'

export const getCards = createAsyncThunk(
  'cards/get',
  async (data: Partial<CardsPageParamsType>, thunkApi) => {
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

export const postCard = createAsyncThunk(
  'cards/post',
  async (
    data: {
      postCard: postCardType
      queries: Partial<CardsPageParamsType>
    },
    thunkApi
  ) => {
    try {
      await cardsAPI.postCard(data.postCard)
      thunkApi.dispatch(getCards(data.queries))
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

export const updateCard = createAsyncThunk(
  'cards/put',
  async (
    data: {
      postCard: postCardType
      params: Partial<CardsPageParamsType>
      packId: string
    },
    thunkApi
  ) => {
    try {
      await cardsAPI.putCard(data.postCard)
      thunkApi.dispatch(getCards({ ...data.params, cardsPack_id: data.packId }))
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

export const deleteCard = createAsyncThunk(
  'cards/delete',
  async (
    data: {
      cardID: string
      params: Partial<CardsPageParamsType>
      packId: string
    },
    thunkApi
  ) => {
    try {
      await cardsAPI.deleteCard(data.cardID)
      thunkApi.dispatch(getCards({ ...data.params, cardsPack_id: data.packId }))
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
