import { instance } from '../../../../services/api/api'
import {
  getPacksType,
  PacksPageParamsType,
  PackType,
  PostPackType,
  RootAPIResponse,
} from './types'

export const packsAPI = {
  getPacks(data: Partial<PacksPageParamsType>) {
    return instance
      .get<getPacksType>('cards/pack', {
        params: data,
      })
      .then((res) => {
        const { cardPacks, ...packsGeneral } = res.data
        return { cardPacks, packsGeneral }
      })
  },
  deletePack(packID: string) {
    return instance.delete<RootAPIResponse & { deletedCardsPack: PackType }>(
      'cards/pack',
      {
        params: {
          id: packID,
        },
      }
    )
  },
  postPack(data: PostPackType) {
    return instance.post<RootAPIResponse & { newCardsPack: PackType }>(
      'cards/pack',
      data
    )
  },
  updatePack(data: Partial<PackType> & { _id: string }) {
    return instance.put<RootAPIResponse & { updatedCardsPack: PackType }>(
      'cards/pack',
      { cardsPack: data }
    )
  },
}
