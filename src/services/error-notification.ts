import { Dispatch } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { appActions } from '../state/appSlice'

export const handleAxiosError = (error: unknown, dispatch: Dispatch) => {
  if (error instanceof AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      handleServerNetworkError(error, dispatch)
      return
    }
    handleServerAppError(error.response?.data, dispatch)
  }
  dispatch(appActions.setAppStatus({ status: 'idle' }))
}

export const handleServerAppError = (
  data: { error: string },
  dispatch: Dispatch
) => {
  if (!data.error) {
    dispatch(
      appActions.setAppError({
        error: 'Server returns error: ' + JSON.stringify(data),
      })
    )
    return
  }
  // if (data.error.includes('not authorized')) {
  //   dispatch(loginSlice.actions.setAuth(false))
  // }
  dispatch(appActions.setAppError({ error: data.error }))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => dispatch(appActions.setAppError({ error: error.message }))
