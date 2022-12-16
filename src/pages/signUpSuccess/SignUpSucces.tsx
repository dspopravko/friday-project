import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { signUpSlice } from '../../features/auth/signUp/services/signUpSlice'
import s from './SignUpSucces.module.css'
import { PATH } from '../../data/paths'
import { Navigate } from 'react-router-dom'
import { SuccessBig } from '../../features/auth/common/components/successBig'
import { Email } from '@mui/icons-material'

export const SignUpSuccess = () => {
  const reg = useAppSelector((state) => state.reg)
  setResetTimeout(5000)
  if (!reg.registered) {
    return <Navigate to={`/${PATH.LOGIN.MAIN}`} />
  }
  return (
    <Card className={'loginCanvas'}>
      <SuccessBig>
        <Email />
      </SuccessBig>
      <div className={s.progress}>
        <div className={s.color}></div>
      </div>
    </Card>
  )
}

function setResetTimeout(delay: number) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(signUpSlice.actions.reset())
    }, delay)
    return () => clearTimeout(timer)
  }, [])
}
