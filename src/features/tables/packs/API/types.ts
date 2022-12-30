import { PageParamsType } from '../../common/API/types'
import { RootAPIResponse } from '../../../../services/API/types'

export type PacksPageParamsType = {
  sortPacks: string
  user_id: string
  block: boolean
  packName: string
} & PageParamsType

export type getPacksType = {
  minCardsCount: number
  maxCardsCount: number
  page: number
  pageCount: number
  cardPacksTotalCount: number
  cardPacks: PackType[]
} & RootAPIResponse

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: Date
  updated: Date
  more_id: string
  __v: number
  deckCover: string
}
export type PostPackType = {
  name?: string
  deckCover?: string
  private?: boolean
  cardsPack: Partial<PackType>
}
