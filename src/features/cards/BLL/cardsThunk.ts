import { createAsyncThunk } from '@reduxjs/toolkit'
import { cardsAPI } from '../API/cardsAPI'
import {
  CardsPageParamsType,
  CardsPageType,
  CardType,
  getCardsType,
  postCardType,
  updateCardType,
} from '../API/types'
import { thunkTryCatch } from '../../../api/thunkTryCatch'
import { RootAPIResponse } from '../../../api/types'

export const getCards = createAsyncThunk<
  { cards: CardType[]; cardsPage: CardsPageType },
  Partial<CardsPageParamsType>
>('tables/get', async (data, thunkApi) => {
  return thunkTryCatch(
    thunkApi,
    async () => await cardsAPI.getCards({ pageCount: 10, ...data })
  )
})

type postCardPropsType = {
  postCard: Partial<postCardType> & { cardsPack_id: string }
  queries: Partial<CardsPageParamsType>
}
export const postCard = createAsyncThunk<
  RootAPIResponse & { newCardsPack: CardType },
  postCardPropsType
>('tables/post', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await cardsAPI.postCard(data.postCard)
    thunkApi.dispatch(getCards(data.queries))
    return res.data
  })
})

type updateCardPropsType = {
  postCard: updateCardType
  params: Partial<CardsPageParamsType>
  packId: string
}
export const updateCard = createAsyncThunk<
  RootAPIResponse & { updatedCard: CardType },
  updateCardPropsType
>('tables/put', async (data, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    await cardsAPI.updateCard(data.postCard)
    thunkApi.dispatch(getCards({ ...data.params, cardsPack_id: data.packId }))
    return true
  })
})

type deleteCardPropsType = {
  cardID: string
  params: Partial<CardsPageParamsType>
  packId: string
}
export const deleteCard = createAsyncThunk<getCardsType, deleteCardPropsType>(
  'tables/delete',
  async (data, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      await cardsAPI.deleteCard(data.cardID)
      thunkApi.dispatch(getCards({ ...data.params, cardsPack_id: data.packId }))
      return true
    })
  }
)
