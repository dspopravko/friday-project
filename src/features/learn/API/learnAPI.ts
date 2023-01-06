import { instance } from '../../../api/api'
import { RootAPIResponse } from '../../../api/types'
import { CardType } from '../../cards/API/types'

export const learnAPI = {
  getAllCards(params: getAllCardsType) {
    return instance.get<getAllCardsResponse>('cards/card', { params })
  },
  setGrade(params: SetGradeType) {
    return instance.put<RootAPIResponse & { updatedGrade: CardType }>(
      'cards/grade',
      params
    )
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
export type getAllCardsResponse = {
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
