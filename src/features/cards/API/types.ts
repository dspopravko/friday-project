import { PageParamsType, RootAPIResponse } from '../../../api/types'

export type postCardType = {
  cardsPack_id: string
  question: string
  answer: string
  questionImg: string
  grade: number
  shots: number
  answerImg: string
  questionVideo: string
  answerVideo: string
}
export type CardType = {
  _id: string
  user_id: string
  comments: string
  type: string
  rating: number
  more_id: string
  created: Date
  updated: Date
  __v: number
} & postCardType

export type CardsPageParamsType = {
  sortCards: string
  cardAnswer: string
  cardsQuestion: string
  cardsPack_id: string
} & PageParamsType

export type CardsPageType = {
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
}
export type getCardsType = {
  cards: CardType[]
} & CardsPageType &
  RootAPIResponse
export type updateCardType = { _id: string } & Partial<postCardType>
