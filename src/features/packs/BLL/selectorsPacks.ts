import { AppRootStateType } from '../../../state/store'
import { createSelector } from '@reduxjs/toolkit'

export const maxCardsInPacksCountSelector = (state: AppRootStateType) =>
  state.packs.packsPage.maxCardsCount
export const currentPageSelector = (state: AppRootStateType) =>
  state.packs.packsPage.page
const pageCount = (state: AppRootStateType) => state.packs.packsPage.pageCount
const cardsPacksTotalCount = (state: AppRootStateType) =>
  state.packs.packsPage.cardPacksTotalCount
export const packsSelector = (state: AppRootStateType) => state.packs.packs
export const isPacksPending = (state: AppRootStateType) => state.packs.pending
export const maxPageSelector = createSelector(
  [cardsPacksTotalCount, pageCount],
  (total, page) => {
    return Math.ceil(total / page)
  }
)
