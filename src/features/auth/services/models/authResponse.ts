export type authResponse = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number //количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean //подтвердил ли почту
  rememberMe: boolean
  error?: string
}
