import { createAsyncThunk } from '@reduxjs/toolkit'
import { cardsAPI } from '../API/cardsAPI'
import { CardsPageParamsType, postCardType, updateCardType } from '../API/types'
import { thunkTryCatch } from '../../../api/thunkTryCatch'

export const getCards = createAsyncThunk(
  'tables/get',
  async (data: Partial<CardsPageParamsType>, thunkApi) => {
    return thunkTryCatch(
      thunkApi,
      async () => await cardsAPI.getCards({ pageCount: 10, ...data })
    )
  }
)

type postCardPropsType = {
  postCard: postCardType
  queries: Partial<CardsPageParamsType>
}
export const postCard = createAsyncThunk(
  'tables/post',
  async (data: postCardPropsType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await cardsAPI.postCard(data.postCard)
      thunkApi.dispatch(getCards(data.queries))
      return res.data
    })
  }
)

type updateCardPropsType = {
  postCard: updateCardType
  params: Partial<CardsPageParamsType>
  packId: string
}
export const updateCard = createAsyncThunk(
  'tables/put',
  async (data: updateCardPropsType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      await cardsAPI.updateCard(data.postCard)
      thunkApi.dispatch(getCards({ ...data.params, cardsPack_id: data.packId }))
      return true
    })
  }
)
type deleteCardPropsType = {
  cardID: string
  params: Partial<CardsPageParamsType>
  packId: string
}

export const deleteCard = createAsyncThunk(
  'tables/delete',
  async (data: deleteCardPropsType, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      await cardsAPI.deleteCard(data.cardID)
      thunkApi.dispatch(getCards({ ...data.params, cardsPack_id: data.packId }))
      return true
    })
  }
)
