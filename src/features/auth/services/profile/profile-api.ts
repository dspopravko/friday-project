import { instance } from '../../../../services/api/api'
import { loginPayload } from '../login/login-api'
import { AxiosResponse } from 'axios'

export type blockDataType = {
  id: string
  blockReason: string
}
export type userUpdateData = {
  name: string
  avatar?: string // url or base64
}
export type apiUserType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date
  updated: Date
  __v: number
  avatar?: string
}
export type registerSuccess = {
  addedUser: apiUserType
}
export const profileApi = {
  block(blockData: blockDataType) {
    return instance.post<
      blockDataType,
      { user: string; blockedCardPacksCount: number }
    >('auth/me', blockData)
  },
  updateUser(data: userUpdateData & loginPayload) {
    return instance.post<userUpdateData, AxiosResponse<registerSuccess>>(
      'auth/login',
      data
    )
  },
}