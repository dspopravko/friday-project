import { handleAxiosError } from '../services/error-notification'
import { AxiosError } from 'axios'

export const thunkTryCatch = async (
  thunkApi: any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  logic: Function,
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function,
  ignoreError = false
) => {
  try {
    return await logic()
  } catch (e: unknown) {
    !ignoreError && handleAxiosError(e, thunkApi.dispatch)
    if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
      if (onError) {
        await onError()
      }
      return thunkApi.rejectWithValue(e.response?.data.error)
    } else {
      throw e
    }
  }
}
