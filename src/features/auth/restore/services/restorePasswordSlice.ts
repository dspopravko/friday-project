import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { restoreAPI, restorePasswordPayloadType } from './restoreAPI'
import { handleAxiosError } from '../../../../services/error-notification'
import { AxiosError } from 'axios'

const initialState = {
  isFetching: false,
  restored: false,
  errors: '',
  email: '',
}

export const restorePasswordSlice = createSlice({
  name: 'restore',
  initialState: initialState,
  reducers: {
    setRestorePasswordState(state, action: PayloadAction<boolean>) {
      state.restored = action.payload
    },
    setRestoreEmailValue(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    reset(state) {
      state.isFetching = false
      state.restored = false
      state.errors = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restorePassword.fulfilled, (state) => {
      state.restored = true
      state.isFetching = false
    })
    builder.addCase(restorePassword.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(restorePassword.rejected, (state, action) => {
      state.errors = JSON.stringify(action.payload)
      state.isFetching = false
    })
  },
})

export const restorePasswordReducer = restorePasswordSlice.reducer

export const restorePassword = createAsyncThunk(
  'auth/restorePasswordSlice',
  async (data: restorePasswordPayloadType, thunkApi) => {
    try {
      const res = await restoreAPI.restorePassword(data)
      thunkApi.dispatch(
        restorePasswordSlice.actions.setRestoreEmailValue(data.email)
      )
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
