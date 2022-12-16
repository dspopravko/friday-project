import React from 'react'
import { LoginForm } from './form/LoginForm'
import { Card, Typography } from '@mui/material'
import { PATH } from '../../../../data/paths'
import { setTitle } from '../../../../services/setHeaderTitle'
import { authMeHook } from '../../services/authMeHook'
import { SuggestBlock } from '../common/suggestBlock'

export const Login = () => {
  setTitle('Login', 'Login')
  authMeHook()
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
          path={PATH.LOGIN.SIGNUP}
        />
      </div>
    </Card>
  )
}
