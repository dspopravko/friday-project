import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getPacksRequestType,
  getPacksResponseType,
  packResponseType,
} from '../API/packsAPI'
import { getPacks } from './packsThunk'

export type PacksType = Omit<packResponseType, '__v' | 'more_id'>
export type PacksGeneralType = Omit<
  getPacksResponseType,
  'cardPacks' | 'token' | 'tokenDeathTime'
>

const initialState = {
  packsCurrent: [] as Array<PacksType>,
  packsGeneral: {} as PacksGeneralType,
  packsMaxCardsCount: 100,
  queryParams: {} as getPacksRequestType,
  pending: false,
  errors: '',
}

export const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.rejected, (state) => {
      state.pending = false
    })
    builder.addCase(getPacks.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsCurrent = action.payload.cardPacks
      state.packsGeneral = action.payload.packsGeneral
      if (
        action.payload.packsGeneral.cardPacksTotalCount >
        state.packsMaxCardsCount
      ) {
        state.packsMaxCardsCount =
          action.payload.packsGeneral.cardPacksTotalCount
      }
      state.pending = false
    })
  },
})

export const packsReducer = packsSlice.reducer
