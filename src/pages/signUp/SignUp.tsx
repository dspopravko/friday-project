import React from 'react'
import { Card, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { SignUpForm } from '../../features/auth/signUp/form/SignUpForm'
import { useAppSelector } from '../../state/store'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { FormError } from '../../features/auth/common/components/formError'
import { motion } from 'framer-motion'

export const SignUp = () => {
  const { errors, registered } = useAppSelector((state) => state.reg)
  useSetHeaderTitle('Sign Up')

  if (registered) {
    return <Navigate to={'/' + PATH.SUCCESS} />
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 0, duration: 0.4}}
      className="pageContainer">
      <Card className={'loginCanvas'}>
        {/*<SuccessSignup />*/}
        <Typography variant={'h5'}>Sign up</Typography>
        <SignUpForm />
        <FormError error={errors} />
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <SuggestBlock
            question={'Already have an account?'}
            suggestion={'Sign in'}
            path={'/' + PATH.LOGIN.MAIN}
          />
        </div>
      </Card>
    </motion.div>
  )
}
