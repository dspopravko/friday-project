import { Card, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { theme } from '../../../../assets/mui-theme'
import { HeaderTitleContext } from '../../../../context/context'
import { PATH } from '../../../../data/paths'
import { SignUpForm } from './form/SignUpForm'
import { useAppSelector } from '../../../../state/store'

export const SignUp = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  const reg = useAppSelector((state) => state.reg)
  useEffect(() => {
    setTitle('Sign Up')
  }, [])

  if (reg.registered) {
    return <Navigate to={`/${PATH.LOGIN.MAIN}/${PATH.SUCCESS}`} />
  }

  return (
    <Card className={'loginCanvas'}>
      {/*<SuccessSignup />*/}
      <Typography variant={'h5'}>Sign up</Typography>
      <SignUpForm />
      <Typography
        sx={{
          mt: '10px',
          color: theme.palette.error.dark,
        }}
      >
        {reg.errors}
      </Typography>
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Typography textAlign={'center'}>Already have an account?</Typography>
        <NavLink
          replace
          to={'/' + PATH.LOGIN.MAIN}
          style={{
            textDecoration: 'underline',
            color: theme.palette.primary.light,
          }}
        >
          <Typography
            variant={'h6'}
            textAlign={'center'}
            sx={{
              mt: '4px',
              '&:hover': {
                fontWeight: '600',
              },
            }}
          >
            Sign in
          </Typography>
        </NavLink>
      </div>
    </Card>
  )
}
