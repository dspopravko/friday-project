import React from 'react'
import { LoginForm } from '../../features/auth/login/form/LoginForm'
import { Card, Typography } from '@mui/material'
import { PATH } from '../../data/paths'
import { setTitle } from '../../services/setHeaderTitle'
import { authMeHook } from '../../features/auth/common/hooks/authMeHook'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { useAppSelector } from '../../state/store'
import { Navigate } from 'react-router-dom'

export const Login = () => {
  setTitle('Login', 'Login')
  authMeHook()
  const { isAuth } = useAppSelector((state) => state.auth)
  if (isAuth) {
    return <Navigate to={'/' + PATH.PROFILE} />
  }
  return (
    <Card className={'loginCanvas'}>
      <Typography variant={'h5'}>Sign in</Typography>
      <LoginForm />
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <SuggestBlock
          question={"Don't have an account?"}
          suggestion={'Sign up'}
          path={'/' + PATH.LOGIN.SIGNUP}
        />
      </div>
    </Card>
  )
}