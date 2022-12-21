import { AppRootStateType } from './store'

export const userIdSelector = (state: AppRootStateType) =>
  state.profile.user._id
