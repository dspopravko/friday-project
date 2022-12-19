import { AppRootStateType } from '../../state/store'

export const maxCardsInPacksCountSelector = (state: AppRootStateType) =>
  state.packs.packsGeneral.maxCardsCount
