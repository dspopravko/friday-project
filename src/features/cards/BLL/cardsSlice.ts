import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteCard, getCards, postCard } from './cardsThunk'
import { CardsPageType, CardType } from '../API/types'
import { updatePack } from '../../packs/BLL/packsThunk'
import { PackType } from '../../packs/API/types'

export const rememberPack = createAction(
  'tables/rememberPack',
  (currentPack: PackType) => ({
    payload: { currentPack },
  })
)

const initialState = {
  cardsCurrent: [] as CardType[],
  cardsPage: {} as CardsPageType,
  currentPack: {} as PackType,
  currentCardsUserName: '',
  pending: false,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.pending = false
      state.cardsCurrent = action.payload.cards
      state.cardsPage = action.payload.cardsPage
      state.currentPack.deckCover = action.payload.cardsPage.packDeckCover
      state.currentPack.name = action.payload.cardsPage.packName
      state.currentPack.created = action.payload.cardsPage.packCreated
      state.currentPack.updated = action.payload.cardsPage.packUpdated
      state.currentPack.cardsCount = action.payload.cardsPage.cardsTotalCount
      state.currentPack.user_id = action.payload.cardsPage.packUserId
      state.currentPack.type = action.payload.cardsPage.packPrivate
    })
    builder.addCase(getCards.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getCards.rejected, (state) => {
      state.pending = false
    })
    builder.addCase(rememberPack, (state, action) => {
      state.currentPack = action.payload.currentPack
    })
    builder.addCase(updatePack.fulfilled, (state, action) => {
      state.cardsPage.packName = action.payload.updatedCardsPack.name
    })
    builder.addCase(postCard.fulfilled, (state) => {
      state.currentPack.cardsCount = state.currentPack.cardsCount + 1
    })
    builder.addCase(deleteCard.fulfilled, (state) => {
      state.currentPack.cardsCount = state.currentPack.cardsCount - 1
    })
  },
})

export const cardsReducer = cardsSlice.reducer
export const cardsActions = cardsSlice.actions
