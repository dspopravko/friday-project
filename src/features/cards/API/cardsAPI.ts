import { instance } from '../../../api/api'
import {
  CardsPageParamsType,
  CardType,
  getCardsType,
  postCardType,
  updateCardType,
} from './types'
import { RootAPIResponse } from '../../../api/types'

export const cardsAPI = {
  getCards(data: Partial<CardsPageParamsType>) {
    return instance
      .get<getCardsType>('cards/card', {
        params: data,
      })
      .then((res) => {
        const { cards, ...cardsPage } = res.data
        return { cards, cardsPage }
      })
  },
  deleteCard(cardID: string) {
    return instance.delete<getCardsType>('cards/card', {
      params: {
        id: cardID,
      },
    })
  },
  postCard(data: Partial<postCardType> & { cardsPack_id: string }) {
    return instance.post<RootAPIResponse & { newCardsPack: CardType }>(
      'cards/card',
      { card: data }
    )
  },
  updateCard(data: updateCardType) {
    return instance.put<RootAPIResponse & { updatedCard: CardType }>(
      'cards/card',
      { card: data }
    )
  },
}
