import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { appSlice } from '../../state/appSlice'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appSlice.actions.setAppError({ error: null }))
  }
  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
