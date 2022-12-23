import { instance } from '../../../../services/API/api'
import { AxiosResponse } from 'axios'
import { apiUserType } from '../../profile/services/profileAPI'

export type loginSuccess = apiUserType & {
  __v: number
  token: string
  tokenDeathTime: number
}
export type loginPayload = {
  email: string
  password: string
}
export const loginAPI = {
  login(payload: loginPayload) {
    return instance.post<loginPayload, AxiosResponse<loginSuccess>>(
      'auth/login',
      payload
    )
  },
  logout() {
    return instance.delete<{ info: string }>('auth/me')
  },
  me() {
    return instance.post<null, AxiosResponse<loginSuccess>>('auth/me', {})
  },
}
