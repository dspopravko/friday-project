import { handleAxiosError } from '../../../../services/error-notification'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { regApi, RegType } from './signUpAPI'
import { AxiosError } from 'axios'

const initialState = {
  registered: false,
  email: '',
  errors: '',
}

export const signUpSlice = createSlice({
  name: 'reg',
  initialState: initialState,
  reducers: {
    setReg(state, action: PayloadAction<boolean>) {
      state.registered = action.payload
    },
    reset(state) {
      state.registered = false
      state.errors = ''
      state.email = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.registered = true
      state.email = action.payload.email
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = JSON.stringify(action.payload)
    })
  },
})

export const regReducer = signUpSlice.reducer
export const { setReg } = signUpSlice.actions

export const signUp = createAsyncThunk(
  'auth/register',
  async (data: RegType, thunkApi) => {
    try {
      const res = await regApi.reg(data)
      return res.data.addedUser
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data.error)
      } else {
        throw e
      }
    }
  }
)
