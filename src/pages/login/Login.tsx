import React from 'react'
import { LoginForm } from '../../features/auth/login/UI/LoginForm'
import { Typography } from '@mui/material'
import { PATH } from '../../data/paths'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { useAppSelector } from '../../state/store'
import { Navigate } from 'react-router-dom'
import { isAuthSelector } from '../../features/auth/common/selectors/selectorsAuth'
import { motion } from 'framer-motion'

export const Login = () => {
  useSetHeaderTitle('Login', 'Login')
  const isAuth = useAppSelector(isAuthSelector)
  if (isAuth) {
    return <Navigate to={'/' + PATH.PACKS} />
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.4 }}
      className={'loginCanvas'}
    >
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
    </motion.div>
  )
}
