import { AppRootStateType } from '../../../state/store'

export const userSelector = (state: AppRootStateType) => state.user.user
export const userPendingSelector = (state: AppRootStateType) =>
  state.user.pending
