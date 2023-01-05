import { AppRootStateType } from '../../../state/store'

export const userSelector = (state: AppRootStateType) => state.user.user
