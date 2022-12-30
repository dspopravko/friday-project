import React, { useEffect } from 'react'
import { Card, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { PATH } from '../../data/paths'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { SuccessBig } from '../../features/auth/common/components/successBig'
import { Email } from '@mui/icons-material'
import { RestoreForm } from '../../features/auth/restore/UI/restoreForm'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { theme } from '../../assets/mui-theme'
import { restorePasswordSlice } from '../../features/auth/restore/BLL/restorePasswordSlice'

export const PasswordRestore = () => {
  useSetHeaderTitle('Restore password')
  resetState()
  const {
    restored,
    errors: serverErrors,
    isFetching,
    email,
  } = useAppSelector((state) => state.res)

  return (
    <Card className={'loginCanvas'}>
      {restored ? (
        <>
          <SuccessBig
            GoTo={{ title: 'Sign In', path: '/' + PATH.LOGIN.MAIN }}
            email={email}
          >
            <Email />
          </SuccessBig>
        </>
      ) : (
        <>
          <Typography variant={'h5'}>Forgot your password?</Typography>
          <RestoreForm isFetching={isFetching} />
          <SuggestBlock
            question={'Did you remember your password?'}
            suggestion={'Try logging in'}
            path={'/' + PATH.LOGIN.MAIN}
          />
        </>
      )}
      <Typography
        sx={{
          mt: '10px',
          color: theme.palette.error.dark,
        }}
      >
        {serverErrors}
      </Typography>
    </Card>
  )
}

function resetState() {
  const dispatch = useAppDispatch()
  useEffect(
    () => () => {
      dispatch(restorePasswordSlice.actions.reset())
    },
    []
  )
}
