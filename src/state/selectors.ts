import { AppRootStateType } from './store'

export const userIdSelector = (state: AppRootStateType) =>
  state.profile.user._id
export const appErrorSelector = (state: AppRootStateType) => state.app.error
export const appStatusSelector = (state: AppRootStateType) => state.app.status
