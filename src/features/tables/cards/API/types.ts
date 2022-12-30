import { PageParamsType } from '../../common/API/types'

export type postCardType = {
  cardsPack_id: string
  question?: string
  answer: string
  questionImg?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type CardsPageParamsType = {
  sortCards: string
  cardAnswer: string
  cardsQuestion: string
  cardsPack_id: string
} & PageParamsType

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: Date
  updated: Date
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}
export type getCardsType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: Date
  packUpdated: Date
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}
export type updateCardType = Omit<postCardType, 'cardsPack_id'> & {
  _id: string
}
