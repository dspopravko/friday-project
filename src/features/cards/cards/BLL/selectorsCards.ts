import { AppRootStateType } from '../../../../state/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectCards = (state: AppRootStateType) => state.cards.cardsCurrent
export const currentPageSelector = (state: AppRootStateType) =>
  state.cards.cardsGeneral.page
const pageCount = (state: AppRootStateType) =>
  state.cards.cardsGeneral.pageCount
const cardsPacksTotalCount = (state: AppRootStateType) =>
  state.cards.cardsGeneral.cardsTotalCount

export const maxPageSelector = createSelector(
  [cardsPacksTotalCount, pageCount],
  (total, page) => {
    return Math.ceil(total / page)
  }
)
