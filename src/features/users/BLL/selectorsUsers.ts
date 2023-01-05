import { AppRootStateType } from '../../../state/store'

export const usersSelector = (state: AppRootStateType) => state.users.users
