import { instance } from '../../../../services/API/api'
import {
  getPacksType,
  PacksPageParamsType,
  PackType,
  PostPackType,
} from './types'
import { RootAPIResponse } from '../../../../services/API/types'

export const packsAPI = {
  getPacks(params: Partial<PacksPageParamsType>) {
    return instance.get<getPacksType>('cards/pack', { params }).then((res) => {
      const { cardPacks, ...packsGeneral } = res.data
      return { cardPacks, packsGeneral }
    })
  },
  deletePack(id: string) {
    return instance.delete<RootAPIResponse & { deletedCardsPack: PackType }>(
      'cards/pack',
      { params: { id } }
    )
  },
  postPack(data: PostPackType) {
    return instance.post<RootAPIResponse & { newCardsPack: PackType }>(
      'cards/pack',
      data
    )
  },
  updatePack(cardsPack: Partial<PackType> & { _id: string }) {
    return instance.put<RootAPIResponse & { updatedCardsPack: PackType }>(
      'cards/pack',
      { cardsPack }
    )
  },
}
