import { instance } from '../../../api/api'
import { getUserParamsType, getUserResponseType } from './types'

export const userAPI = {
  getUser(params: getUserParamsType) {
    return instance.get<getUserResponseType>('social/user', { params })
  },
}
