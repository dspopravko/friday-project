import { AxiosResponse } from 'axios'
import { instance } from '../../../../services/api/api'
import { RegType } from '../../components/signUp/form/registrationSlice'

export const regApi = {
  reg(data: RegType) {
    return instance.post('auth/register', {
      email: data.email,
      password: data.password,
    })
  },
}
