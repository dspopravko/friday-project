import { instance } from '../../../api/api'
import { UsersPageParamsType, UsersResponseType } from './types'

export const usersAPI = {
  getUsers(params: Partial<UsersPageParamsType>) {
    return instance.get<UsersResponseType>('social/users', { params })
  },
}
