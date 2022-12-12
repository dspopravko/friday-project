import { instance } from '../../../services/api/api'
import { AxiosResponse } from 'axios'
import {
  loginSuccess,
  registerSuccess,
} from '../../../services/api/models/responsesFromApi'
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
  block(blockData: blockDataType) {
    return instance.post<
      blockDataType,
      { user: string; blockedCardPacksCount: number }
    >('auth/me', blockData)
  },
  updateUser(data: userUpdateData) {
    return instance.post<userUpdateData, AxiosResponse<registerSuccess>>(
      'auth/login',
      data
    )
  },
}

export type blockDataType = {
  id: string
  blockReason: string
}
export type userUpdateData = {
  name: string
  avatar?: string // url or base64
}
