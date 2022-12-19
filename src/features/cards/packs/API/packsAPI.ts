import { instance } from '../../../../services/api/api'

export const packsAPI = {
  getPacks(data: Partial<getPacksRequestType>) {
    return instance
      .get<getPacksResponseType>('cards/pack', {
        params: { ...data },
      })
      .then((res) => {
        const { cardPacks, ...packsGeneral } = res.data
        return { cardPacks, packsGeneral }
      })
  },
  deletePack(data: string) {
    return instance.delete<getPacksResponseType>('cards/pack?id=' + data)
  },
}
export type getPacksRequestType = {
  packName: string
  min: number
  max: number
  sortPacks: string
  page: number
  pageCount: number
  user_id: string
  block: boolean
}

export type packResponseType = {
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
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: string
}

export type getPacksResponseType = {
  cardPacks: packResponseType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
