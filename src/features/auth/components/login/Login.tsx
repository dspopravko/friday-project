import React from 'react'
import { LoginForm } from './form/LoginForm'
import { Card, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../../data/paths'
import { theme } from '../../../../assets/mui-theme'
import { setTitle } from '../../../../services/setHeaderTitle'
import { authMeHook } from '../../services/authMe'

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
        <Typography textAlign={'center'}>
          Don&apos;t have an account?
        </Typography>
        <NavLink
          replace
          to={PATH.LOGIN.SIGNUP}
          style={{
            textDecoration: 'underline',
            color: theme.palette.primary.light,
          }}
        >
          <Typography
            variant={'h6'}
            textAlign={'center'}
            sx={{
              '&:hover': {
                fontWeight: '600',
              },
            }}
          >
            Sign up
          </Typography>
        </NavLink>
      </div>
    </Card>
  )
}
