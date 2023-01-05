import { PageParamsType, RootAPIResponse } from '../../../api/types'

export type UserType = {
  _id: string
  email: string
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date
  updated: Date
  avatar: string
}
export type UsersResponseType = {
  users: UserType
  page: number
  pageCount: number
  usersTotalCount: number
  minPublicCardPacksCount: number
  maxPublicCardPacksCount: number
} & RootAPIResponse

export type UsersPageParamsType = {
  sortUsers: string
  userName: string
} & PageParamsType
