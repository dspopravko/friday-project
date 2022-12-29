import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardsType } from '../../cards/cards/BLL/cardsSlice'
import { getAllCards, setGrade } from './learnThunk'

const initialState = {
  cards: [] as CardsType[],
  packName: '',
  pending: false,
  loaded: false,
  isCompleted: false,
}

export const learnSlice = createSlice({
  name: 'learn',
  initialState: initialState,
  reducers: {
    removeCard(state, action: PayloadAction<{ cardId: string }>) {
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.payload.cardId),
      }
    },
    resetSlice(state) {
      state.cards = []
      state.pending = false
      state.loaded = false
      state.isCompleted = false
      state.packName = ''
    },
    learnCompleted(state) {
      state.isCompleted = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCards.fulfilled, (state, action) => {
      state.cards = action.payload.cards
      state.packName = action.payload.packName
      state.pending = false
      state.loaded = true
    })
    builder.addCase(getAllCards.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getAllCards.rejected, (state) => {
      state.pending = false
    })
    builder.addCase(setGrade.fulfilled, (state) => {
      state.pending = false
    })
    builder.addCase(setGrade.pending, (state) => {
      state.pending = true
    })
    builder.addCase(setGrade.rejected, (state) => {
      state.pending = false
    })
  },
})

export const learnReducer = learnSlice.reducer
