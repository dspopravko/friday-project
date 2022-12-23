import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCards } from './cardsThunk'
import { CardType, getCardsType } from '../API/types'

export const rememberPack = createAction(
  'cards/rememberPack',
  (userName, packID) => ({
    payload: { userName, packID },
  })
)

export type CardsType = Omit<CardType, '__v' | 'more_id'>
export type CardsGeneralType = Omit<
  getCardsType,
  'token' | 'tokenDeathTime' | 'cards'
>

const initialState = {
  cardsCurrent: [] as Array<CardsType>,
  cardsGeneral: {} as CardsGeneralType,
  currentCardsUserName: 'Friend',
  pending: false,
  errors: '',
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsCurrent = action.payload.cards
      state.cardsGeneral = action.payload.cardsGeneral
      state.pending = false
    })
    builder.addCase(getCards.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getCards.rejected, (state) => {
      state.pending = false
    })
    builder.addCase(rememberPack, (state, action) => {
      state.currentCardsUserName = action.payload.userName
    })
  },
})

export const cardsReducer = cardsSlice.reducer
