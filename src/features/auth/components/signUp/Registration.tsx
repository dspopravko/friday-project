import { Card, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { theme } from '../../../../assets/mui-theme'
import { HeaderTitleContext } from '../../../../context/context'
import { PATH } from '../../../../data/paths'
import { RegistrationForm } from './form/RegistrationForm'

export const Registration = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  useEffect(() => {
    setTitle('Login page: signUp')
  }, [])
  return (
    <Card className={'loginCanvas'}>
      <Typography variant={'h5'}>Sign up</Typography>
      <RegistrationForm />
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
