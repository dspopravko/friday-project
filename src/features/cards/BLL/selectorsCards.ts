import { AppRootStateType } from '../../../state/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectCards = (state: AppRootStateType) => state.cards.cardsCurrent
export const currentPageSelector = (state: AppRootStateType) =>
  state.cards.cardsPage.page
const pageCount = (state: AppRootStateType) => state.cards.cardsPage.pageCount
const cardsPacksTotalCount = (state: AppRootStateType) =>
  state.cards.cardsPage.cardsTotalCount
export const cardsCurrentPack = (state: AppRootStateType) =>
  state.cards.currentPack

export const maxPageSelector = createSelector(
  [cardsPacksTotalCount, pageCount],
  (total, page) => {
    return Math.ceil(total / page)
  }
)
