import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deletePack, getPacks } from './packsThunk'
import { PacksPageParamsType, packsPageType, PackType } from '../API/types'

export type PacksType = Omit<PackType, '__v' | 'more_id'>

const initialState = {
  packsCurrent: [] as PacksType[],
  packsPage: {} as packsPageType,
  queryParams: {} as Partial<PacksPageParamsType>,
  pending: false,
}

const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload
    },
    setQueryParams(state, action: PayloadAction<Partial<PacksPageParamsType>>) {
      state.queryParams = action.payload
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsCurrent = action.payload.cardPacks
      state.packsPage = action.payload.packsPage
      state.pending = false
    })
    builder.addCase(getPacks.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getPacks.rejected, (state) => {
      state.pending = false
    })
    builder.addCase(deletePack.fulfilled, (state, action) => {
      state.pending = false
      state.packsCurrent = state.packsCurrent.filter(
        (pack) => pack._id !== action.payload.deletedCardsPack._id
      )
    })
    builder.addCase(deletePack.pending, (state) => {
      state.pending = true
    })
    builder.addCase(deletePack.rejected, (state) => {
      state.pending = false
    })
  },
})

export const packsReducer = packsSlice.reducer
export const packsActions = packsSlice.actions
