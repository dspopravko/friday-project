import { instance } from '../../../../services/api/api'
import { AxiosResponse } from 'axios'
import { apiUserType } from '../profile/profile-api'

export type loginSuccess = apiUserType & {
  __v: number
  token: string
  tokenDeathTime: number
}
export type loginPayload = {
  email: string
  password: string
}
export const loginApi = {
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
