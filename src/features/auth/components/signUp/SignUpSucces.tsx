import React, { useEffect } from 'react'
import { Card, Icon, Typography } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { signUpSlice } from './form/signUpSlice'
import s from './SignUpSucces.module.css'
import { PATH } from '../../../../data/paths'
import { Navigate } from 'react-router-dom'

export const SignUpSuccess = () => {
  const dispatch = useAppDispatch()
  const reg = useAppSelector((state) => state.reg)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(signUpSlice.actions.reset())
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
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
        <div style={{ fontWeight: 'bold', margin: '8px' }}>{reg.email}</div>
        Please check your email!
      </Typography>
      <div className={s.progress}>
        <div className={s.color}></div>
      </div>
    </Card>
  )
}
