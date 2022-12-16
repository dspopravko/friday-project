import React, { useEffect } from 'react'
import { Card, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { PATH } from '../../../../data/paths'
import { setTitle } from '../../../../services/setHeaderTitle'
import { SuccessBig } from '../common/successBig'
import { Email } from '@mui/icons-material'
import { RestoreForm } from './form/restoreForm'
import { SuggestBlock } from '../common/suggestBlock'
import { theme } from '../../../../assets/mui-theme'
import { restorePasswordSlice } from '../../services/restore/restorePasswordSlice'

export const PasswordRestore = () => {
  setTitle('Restore password')
  resetState()
  const {
    restored,
    errors: serverErrors,
    isFetching,
  } = useAppSelector((state) => state.res)

  return (
    <div className="pageContainer">
      <Card className={'loginCanvas'}>
        {restored ? (
          <>
            <SuccessBig
              GoTo={{ title: 'Sign In', path: '/' + PATH.LOGIN.MAIN }}
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
    </div>
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
