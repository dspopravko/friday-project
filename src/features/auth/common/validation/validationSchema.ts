import * as yup from 'yup'

export const defaultSchema = {
  password: yup.string().min(8).max(32).required(),
  email: yup.string().email().required(),
}
