import { instance } from '../../../services/api/api'
import { AxiosResponse } from 'axios'
import { loginSuccess } from '../../../services/api/models/responsesFromApi'
import { authPayload } from './models/auth-payload'

export const authApi = {
  me() {
    return instance.post<null, AxiosResponse<loginSuccess>>('auth/me', {})
  },
  ping(frontTime?: number) {
    return instance.post<
      null,
      AxiosResponse<{
        ping: number
        backTime: number
        frontTime: number | string
        info: string
      }>
    >('ping', { frontTime })
  },
  login(payload: authPayload) {
    return instance.post<authPayload, AxiosResponse<loginSuccess>>(
      'auth/login',
      payload
    )
  },
  logout() {
    return instance.delete<{ info: string }>('auth/me')
  },
}
