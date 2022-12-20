import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getPacksRequestType,
  getPacksResponseType,
  packResponseType,
} from '../API/packsAPI'
import { deletePack, getPacks } from './packsThunk'

export type PacksType = Omit<packResponseType, '__v' | 'more_id'>
export type PacksGeneralType = Omit<
  getPacksResponseType,
  'cardPacks' | 'token' | 'tokenDeathTime'
>

const initialState = {
  packsCurrent: [] as Array<PacksType>,
  packsGeneral: {} as PacksGeneralType,
  queryParams: {} as Partial<getPacksRequestType>,
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
    setQueryParams(state, action: PayloadAction<Partial<getPacksRequestType>>) {
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
