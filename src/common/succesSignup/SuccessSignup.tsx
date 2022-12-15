import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { Navigate, redirect } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { regAction } from '../../features/auth/components/signUp/form/registrationSlice'
import { useAppDispatch, useAppSelector } from '../../state/store'

export const SuccessSignup = () => {
  const success = useAppSelector((state) => state.reg.registered)
  const dispatch = useAppDispatch()
  //   const path = '/' + PATH.LOGIN.MAIN
  const handleClose = () => {
    dispatch(regAction({ registered: false }))
    return redirect(PATH.LOGIN.MAIN)
  }
  return (
    <Snackbar open={!!success} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Registration success!
      </Alert>
    </Snackbar>
  )
}
