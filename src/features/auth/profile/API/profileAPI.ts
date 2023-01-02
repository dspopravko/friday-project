import { instance } from '../../../../api/api'
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
  avatar: string
}
export type registerSuccess = {
  addedUser: apiUserType
}
export type updateProfilePropsType = {
  name?: string
  avatar?: string
}
export const profileAPI = {
  block(blockData: blockDataType) {
    return instance.post<
      blockDataType,
      { user: string; blockedCardPacksCount: number }
    >('auth/me', blockData)
  },
  updateUser(data: updateProfilePropsType) {
    return instance.put<userUpdateData, AxiosResponse<registerSuccess>>(
      'auth/me',
      data
    )
  },
}
