import { instance } from '../../../../services/api/api'

export const cardsAPI = {
  getCards(data: Partial<getCardsRequestType>) {
    return instance
      .get<getCardsResponseType>('cards/card', {
        params: data,
      })
      .then((res) => {
        const { cards, ...cardsGeneral } = res.data
        return { cards, cardsGeneral }
      })
  },
  deleteCard(cardID: string) {
    return instance.delete<getCardsResponseType>('cards/card', {
      params: {
        id: cardID,
      },
    })
  },
  postCard(data: postCardRequestType) {
    return instance.post('cards/card', { card: data })
  },
  putCard(data: postCardRequestType) {
    return instance.post('cards/card', { card: data })
  },
}

export type postCardRequestType = {
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

export type getCardsRequestType = {
  pageCount: number
  page: number
  cardAnswer: string
  cardsQuestion: string
  min: number
  max: number
  sortCards: string
  cardsPack_id: string
}

export type cardsResponseType = {
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

export type getCardsResponseType = {
  cards: cardsResponseType[]
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
