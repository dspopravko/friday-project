import { AppRootStateType } from '../../../../state/store'

export const userIDSelector = (state: AppRootStateType) =>
  state.profile.user._id
export const profileSelector = (state: AppRootStateType) => state.profile
export const isAuthSelector = (state: AppRootStateType) => state.auth.isAuth
export const isAuthFetching = (state: AppRootStateType) => state.auth.isFetching
export const newPasswordStateSelector = (state: AppRootStateType) => state.new
