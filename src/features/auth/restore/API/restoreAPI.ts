import { instance } from '../../../../api/api'
import { AxiosResponse } from 'axios'

export type restorePasswordPayloadType = {
  email: string
  from: string
  message: string
}
export type restorePasswordSuccessType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}
export const restoreAPI = {
  restorePassword(data: restorePasswordPayloadType) {
    return instance.post<
      restorePasswordPayloadType,
      AxiosResponse<restorePasswordSuccessType>
    >('auth/forgot', data)
  },
}
