import { handleAxiosError } from './../../../../../services/error-notification'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../../../state/store'
import { regApi } from '../../../services/reg-api'
const initialState = {
  registered: false,
}
export type SingUpType = typeof initialState

export type RegType = {
  email: string
  password: string
  passwordConfirmation: string
}

const dispatch = useAppDispatch()

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

// export const registration = (data: RegType) => {
//   regApi
//     .reg(data)
//     .then((res) => {
//       dispatch(regAction({ registered: true }))
//       console.log(res)
//     })
//     .catch((rej) => {
//       console.log(rej)
//     })
// }

export const signUp = createAsyncThunk(
  'auth/register',
  async (payload: RegType) => {
    try {
      const res = await regApi.reg(payload)
      console.log(res)
      dispatch(regAction({ registered: true }))
    } catch (e) {
      handleAxiosError(e, dispatch)
    }
  }
)
