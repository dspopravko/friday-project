import { instance } from '../../../../services/api/api'
import { AxiosResponse } from 'axios'

type pingResponseType = {
  ping: number
  backTime: number
  frontTime: number | string
  info: string
}
export const pingAPI = {
  ping(frontTime?: number) {
    return instance.post<null, AxiosResponse<pingResponseType>>('ping', {
      frontTime,
    })
  },
}
