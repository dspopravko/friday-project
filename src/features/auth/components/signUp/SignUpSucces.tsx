import React, { useEffect } from 'react'
import { Card, Icon, Typography } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { signUpSlice } from '../../services/signUp/signUpSlice'
import s from './SignUpSucces.module.css'
import { PATH } from '../../../../data/paths'
import { Navigate } from 'react-router-dom'

export const SignUpSuccess = () => {
  const reg = useAppSelector((state) => state.reg)
  setResetTimeout(5000)
  if (!reg.registered) {
    return <Navigate to={`/${PATH.LOGIN.MAIN}`} />
  }
  return (
    <Card className={'loginCanvas'}>
      <div
        style={{
          height: '160px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#62c997',
        }}
      >
        <Icon sx={{ transform: 'scale(4)', mb: '0px' }}>
          <DoneAllIcon />
        </Icon>
      </div>
      <Typography>
        Instruction was sent to:
        <br />
        <span
          style={{ display: 'inline-block', fontWeight: 'bold', margin: '8px' }}
        >
          {reg.email}
        </span>
        <br />
        Please check your email!
      </Typography>
      <div className={s.progress}>
        <div className={s.color}></div>
      </div>
    </Card>
  )
}

export function setResetTimeout(delay: number) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(signUpSlice.actions.reset())
    }, delay)
    return () => clearTimeout(timer)
  }, [])
}
