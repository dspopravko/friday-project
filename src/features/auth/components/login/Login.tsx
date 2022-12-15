import React from 'react'
import { LoginForm } from './form/LoginForm'
import { useAppSelector } from '../../../../state/store'
import { Card, Typography } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'
import { PATH } from '../../../../data/paths'
import { theme } from '../../../../assets/mui-theme'
import { setTitle } from '../../../../services/setHeaderTitle'
import { authMeHook } from '../../services/authMe'

export const Login = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  setTitle('Login', 'Login')
  authMeHook()
  if (isAuth) {
    return <Navigate to={`/${PATH.PROFILE}`} />
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
        <Typography textAlign={'center'}>Already have an account?</Typography>
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
