import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../../../context/context'
import { LoginForm } from './form/LoginForm'
import { useAppDispatch } from '../../../../state/store'
import { authMe } from '../../services/login/loginThunks'
import { Card, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../../data/paths'
import { theme } from '../../../../assets/mui-theme'

export const Login = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTitle('Login page')
    dispatch(authMe())
  }, [])

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
