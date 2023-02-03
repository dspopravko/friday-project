import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { getAllCards, setGrade } from './learnThunk'
import { CardType } from '../../cards/API/types'

const initialState = {
  cards: [] as CardType[],
  packName: '',
  pending: false,
  loaded: false,
  isCompleted: false,
}

const learnSlice = createSlice({
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
    builder
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.cards = action.payload.cards
        state.packName = action.payload.packName
        state.loaded = true
      })
      .addMatcher(isAnyOf(getAllCards.pending, setGrade.pending), (state) => {
        state.pending = true
      })
      .addMatcher(
        isAnyOf(
          getAllCards.fulfilled,
          getAllCards.rejected,
          setGrade.fulfilled,
          setGrade.rejected
        ),
        (state) => {
          state.pending = false
        }
      )
  },
})

export const learnReducer = learnSlice.reducer
export const learnActions = learnSlice.actions
