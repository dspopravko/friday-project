import { AppRootStateType } from '../../../state/store'
import { createSelector } from '@reduxjs/toolkit'

export const usersSelector = (state: AppRootStateType) => state.users.users
export const usersPendingSelector = (state: AppRootStateType) =>
  state.users.pending
export const usersCurrentPage = (state: AppRootStateType) =>
  state.users.usersPage.page
export const usersPageCount = (state: AppRootStateType) =>
  state.users.usersPage.pageCount
export const usersTotalCount = (state: AppRootStateType) =>
  state.users.usersPage.usersTotalCount
export const usersMaxPageSelector = createSelector(
  [usersTotalCount, usersPageCount],
  (total, page) => {
    return Math.ceil(total / page)
  }
)
