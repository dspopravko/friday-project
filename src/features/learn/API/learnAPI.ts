import { instance } from '../../../services/API/api'
import { RootAPIResponse } from '../../../services/API/types'
import { CardType } from '../../tables/cards/API/types'

export const learnAPI = {
  getAllCards(params: getAllCardsType) {
    return instance.get<getAllCardsResponse>('cards/card', { params })
  },
  setGrade(params: SetGradeType) {
    return instance.put('cards/grade', params)
  },
}

export type getAllCardsType = {
  cardsPack_id: string
  pageCount?: number
}
export type SetGradeType = {
  grade: number
  card_id: string
}
type getAllCardsResponse = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: Date
  packDeckCover: string
  packName: string
  packPrivate: boolean
  packUpdated: Date
  packUserId: string
  page: number
  pageCount: number
} & RootAPIResponse
