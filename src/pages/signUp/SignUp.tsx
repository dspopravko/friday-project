import React from 'react'
import { Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { SignUpForm } from '../../features/auth/signUp/UI/SignUpForm'
import { useAppSelector } from '../../state/store'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { SuggestBlock, FormError } from '../../common'
import { motion } from 'framer-motion'
import s from './SignUp.module.css'

export const SignUp = () => {
  const { errors, registered } = useAppSelector((state) => state.signUp)
  useSetHeaderTitle('Sign Up')

  if (registered) {
    return <Navigate to={'/' + PATH.SUCCESS} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.4 }}
      className="pageContainer"
    >
      <div className={'loginCanvas'}>
        <Typography variant={'h5'}>Sign up</Typography>
        <SignUpForm />
        <FormError error={errors} />
        <div className={s.suggestBlockContainer}>
          <SuggestBlock
            question={'Already have an account?'}
            suggestion={'Sign in'}
            path={'/' + PATH.LOGIN.MAIN}
          />
        </div>
      </div>
    </motion.div>
  )
}
