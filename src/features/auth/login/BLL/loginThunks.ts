import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginAPI, loginPayload } from '../API/loginAPI'
import { thunkTryCatch } from '../../../../api/thunkTryCatch'
type authMePropsType = {
  ignoreError?: boolean
}
export const authMe = createAsyncThunk(
  'login/fetchMe',
  async (props: authMePropsType, thunkApi) => {
    return thunkTryCatch(
      thunkApi,
      async () => {
        const res = await loginAPI.me()
        return res.data
      },
      () => undefined,
      props.ignoreError
    )
  }
)

export const login = createAsyncThunk(
  'login/login',
  async (data: loginPayload, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await loginAPI.login(data)
      return res.data
    })
  }
)

export const logout = createAsyncThunk('login/logout', async (_, thunkApi) => {
  return thunkTryCatch(
    thunkApi,
    async () => {
      const res = await loginAPI.logout()
      return res.data
    },
    async () => {
      thunkApi.dispatch(authMe({}))
    }
  )
})
