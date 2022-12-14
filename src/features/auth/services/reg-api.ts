import { AxiosResponse } from 'axios'
import { instance } from '../../../services/api/api'
import { RegType } from '../components/registration/form/registrationSlice'

export const regApi = {
  reg(data: RegType) {
    return instance.post('auth/register', {
      email: data.email,
      password: data.password,
    })
  },
}
