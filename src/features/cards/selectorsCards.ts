import { AppRootStateType } from '../../state/store'

export const maxCardsInPacksCountSelector = (state: AppRootStateType) =>
  state.packs.packsGeneral.maxCardsCount
export const currentPageSelector = (state: AppRootStateType) =>
  state.packs.packsGeneral.page
export const maxPageSelector = (state: AppRootStateType) =>
  state.packs.packsGeneral.pageCount
