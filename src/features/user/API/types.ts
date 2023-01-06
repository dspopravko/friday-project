import { RootAPIResponse } from '../../../api/types'
import { UserType } from '../../users/API/types'

export type getUserResponseType = RootAPIResponse & UserType
export type getUserParamsType = { id: string }
