import React from 'react'
import { Card, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { SignUpForm } from '../../features/auth/signUp/form/SignUpForm'
import { useAppSelector } from '../../state/store'
import { setTitle } from '../../services/setHeaderTitle'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { FormError } from '../../features/auth/common/components/formError'

export const SignUp = () => {
  const { errors, registered } = useAppSelector((state) => state.reg)
  setTitle('Sign Up')

  if (registered) {
    return <Navigate to={'/' + PATH.SUCCESS} />
  }

  return (
    <div className="pageContainer">
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
    </div>
  )
}
