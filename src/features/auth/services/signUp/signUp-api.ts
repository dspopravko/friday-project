import { AxiosResponse } from 'axios'
import { RegType } from '../../components/signUp/form/signUpSlice'
import { instance } from '../../../../services/api/api'

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
