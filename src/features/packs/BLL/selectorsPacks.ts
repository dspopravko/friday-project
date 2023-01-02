import { AppRootStateType } from '../../../state/store'
import { createSelector } from '@reduxjs/toolkit'

export const maxCardsInPacksCountSelector = (state: AppRootStateType) =>
  state.packs.packsGeneral.maxCardsCount
export const currentPageSelector = (state: AppRootStateType) =>
  state.packs.packsGeneral.page
const pageCount = (state: AppRootStateType) =>
  state.packs.packsGeneral.pageCount
const cardsPacksTotalCount = (state: AppRootStateType) =>
  state.packs.packsGeneral.cardPacksTotalCount
export const packsSelector = (state: AppRootStateType) =>
  state.packs.packsCurrent
export const isPacksPending = (state: AppRootStateType) => state.packs.pending
export const maxPageSelector = createSelector(
  [cardsPacksTotalCount, pageCount],
  (total, page) => {
    return Math.ceil(total / page)
  }
)