import { appSlice, appStatus } from '../state/appSlice'
import { Dispatch } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export const handleAxiosError = (error: unknown, dispatch: Dispatch) => {
  if (error instanceof AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      handleServerNetworkError(error, dispatch)
      return
    }
    handleServerAppError(error.response?.data, dispatch)
  }
  dispatch(appSlice.actions.setAppStatus({ status: appStatus.idle }))
}

export const handleServerAppError = (
  data: { error: string },
  dispatch: Dispatch
) => {
  if (!data.error) {
    dispatch(
      appSlice.actions.setAppError({
        error: 'Server returns error: ' + JSON.stringify(data),
      })
    )
    return
  }
  dispatch(appSlice.actions.setAppError({ error: data.error }))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => dispatch(appSlice.actions.setAppError({ error: error.message }))
