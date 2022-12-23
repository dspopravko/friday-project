import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deletePack, getPacks } from './packsThunk'
import { PackType, PacksPageParamsType, getPacksType } from '../API/types'

export type PacksType = Omit<PackType, '__v' | 'more_id'>
export type PacksGeneralType = Omit<
  getPacksType,
  'cardPacks' | 'token' | 'tokenDeathTime'
>

const initialState = {
  packsCurrent: [] as Array<PacksType>,
  packsGeneral: {} as PacksGeneralType,
  queryParams: {} as Partial<PacksPageParamsType>,
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
    setQueryParams(state, action: PayloadAction<Partial<PacksPageParamsType>>) {
      state.queryParams = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsCurrent = action.payload.cardPacks
      state.packsGeneral = action.payload.packsGeneral
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
        (pack) => pack._id !== action.payload
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
