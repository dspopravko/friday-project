import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { redirect } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { setReg } from '../../features/auth/services/signUp/signUpSlice'
import { useAppDispatch, useAppSelector } from '../../state/store'

export const SuccessSignup = () => {
  const success = useAppSelector((state) => state.reg.registered)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(setReg(false))
    return redirect(PATH.LOGIN.MAIN)
  }
  return (
    <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Registration success!
      </Alert>
    </Snackbar>
  )
}
