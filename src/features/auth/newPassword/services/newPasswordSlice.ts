import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'
import { newPasswordAPI, setNewPasswordPayloadType } from './newPasswordAPI'

const initialState = {
  isFetching: false,
  isSet: false,
  errors: '',
}

export const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState: initialState,
  reducers: {
    setRestorePassword(state, action: PayloadAction<boolean>) {
      state.isSet = action.payload
    },
    reset(state) {
      state.isFetching = false
      state.isSet = false
      state.errors = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newPassword.fulfilled, (state) => {
      state.isSet = true
      state.isFetching = false
    })
    builder.addCase(newPassword.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(newPassword.rejected, (state, action) => {
      state.errors = JSON.stringify(action.payload)
      state.isFetching = false
    })
  },
})

export const newPasswordReducer = newPasswordSlice.reducer
export const { setRestorePassword } = newPasswordSlice.actions

export const newPassword = createAsyncThunk(
  'auth/newPasswordSlice',
  async (data: setNewPasswordPayloadType, thunkApi) => {
    try {
      const res = await newPasswordAPI.setNewPassword(data)
      return res.data
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
