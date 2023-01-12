import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/store'
import s from './SignUpSucces.module.css'
import { PATH } from '../../data/paths'
import { Navigate } from 'react-router-dom'
import { SuccessBlock } from '../../common'
import { Email } from '@mui/icons-material'
import { signUpActions } from '../../features/auth/signUp/BLL/signUpSlice'

export const SignUpSuccess = () => {
  const reg = useAppSelector((state) => state.signUp)
  setResetTimeout(5000)
  if (!reg.registered) {
    return <Navigate to={`/${PATH.LOGIN.MAIN}`} />
  }
  return (
    <Card className={'loginCanvas'}>
      <SuccessBlock>
        <Email />
      </SuccessBlock>
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
      dispatch(signUpActions.reset())
    }, delay)
    return () => clearTimeout(timer)
  }, [])
}
