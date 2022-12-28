import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCards } from './cardsThunk'
import { CardType, getCardsType } from '../API/types'
import { updatePack } from '../../packs/BLL/packsThunk'

export const rememberPack = createAction(
  'cards/rememberPack',
  (userName, packName) => ({
    payload: { userName, packName },
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
    resetPack(state) {
      state.cardsGeneral.packUserId = ''
      state.cardsCurrent = []
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
      state.cardsGeneral.packName = action.payload.packName
    })
    builder.addCase(updatePack.fulfilled, (state, action) => {
      state.cardsGeneral.packName = action.payload.updatedCardsPack.name
    })
  },
})

export const cardsReducer = cardsSlice.reducer
