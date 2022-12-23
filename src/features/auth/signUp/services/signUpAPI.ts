import { AxiosResponse } from 'axios'
import { instance } from '../../../../services/API/api'

export interface AddedUser {
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
}

export interface RegType {
  email: string
  password: string
  passwordConfirmation: string
}
export const regApi = {
  reg(data: RegType) {
    return instance.post<RegType, AxiosResponse<{ addedUser: AddedUser }>>(
      'auth/register',
      {
        email: data.email,
        password: data.password,
      }
    )
  },
}
