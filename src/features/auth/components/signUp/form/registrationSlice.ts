import { handleAxiosError } from '../../../../../services/error-notification'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { regApi } from '../../../services/signUp/signUp-api'
import { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'
const initialState = {
  registered: false,
}
export type SingUpType = typeof initialState

export type RegType = {
  email: string
  password: string
  passwordConfirmation: string
}

const slice = createSlice({
  name: 'reg',
  initialState: initialState,
  reducers: {
    regAction(state, action: PayloadAction<SingUpType>) {
      state.registered = action.payload.registered
    },
  },
})

export const regReducer = slice.reducer
export const { regAction } = slice.actions

export const signUp = createAsyncThunk(
  'auth/register',
  async (data: RegType, thunkApi) => {
    try {
      const res = await regApi.reg(data)
      console.log(res)
      thunkApi.dispatch(regAction({ registered: true }))
      // redirect('/login')
    } catch (e) {
      handleAxiosError(e, thunkApi.dispatch)
      if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
        return thunkApi.rejectWithValue(e.response?.data)
      } else {
        throw e
      }
    }
  }
)
