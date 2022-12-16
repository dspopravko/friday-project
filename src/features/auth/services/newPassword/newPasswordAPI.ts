import { instance } from '../../../../services/api/api'
import { AxiosResponse } from 'axios'

type setNewPasswordSuccessType = {
  info: string
  error: string
}
export type setNewPasswordPayloadType = {
  password: string
  resetPasswordToken: string
}
export const newPasswordAPI = {
  setNewPassword(data: setNewPasswordPayloadType) {
    return instance.post<
      setNewPasswordPayloadType,
      AxiosResponse<setNewPasswordSuccessType>
    >('auth/set-new-password', data)
  },
}
