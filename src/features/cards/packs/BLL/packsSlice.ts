import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { packResponseType } from '../API/packsAPI'
import { getPacks } from './packsThunk'

type packsType = Omit<packResponseType, '__v' | 'more_id'>

const initialState = {
  packs: [] as Array<packsType>,
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
      state.packs = action.payload.cardPacks
      state.pending = false
    })
  },
})

export const packsReducer = packsSlice.reducer
