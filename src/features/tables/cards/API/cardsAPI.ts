import { instance } from '../../../../services/API/api'
import { CardsPageParamsType, getCardsType, postCardType } from './types'

export const cardsAPI = {
  getCards(data: Partial<CardsPageParamsType>) {
    return instance
      .get<getCardsType>('cards/card', {
        params: data,
      })
      .then((res) => {
        const { cards, ...cardsGeneral } = res.data
        return { cards, cardsGeneral }
      })
  },
  deleteCard(cardID: string) {
    return instance.delete<getCardsType>('cards/card', {
      params: {
        id: cardID,
      },
    })
  },
  postCard(data: postCardType) {
    return instance.post('cards/card', { card: data })
  },
  updateCard(data: Omit<postCardType, 'cardsPack_id'> & { _id: string }) {
    return instance.put('cards/card', { card: data })
  },
}