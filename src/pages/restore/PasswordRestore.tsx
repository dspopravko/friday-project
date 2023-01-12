import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { PATH } from '../../data/paths'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { SuccessBig } from '../../features/auth/common/components/successBig'
import { Email } from '@mui/icons-material'
import { RestoreForm } from '../../features/auth/restore/UI/restoreForm'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { theme } from '../../assets/mui-theme'
import { resPassActions } from '../../features/auth/restore/BLL/restorePasswordSlice'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.4 }}
      className={'loginCanvas'}
    >
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
    </motion.div>
  )
}

function resetState() {
  const dispatch = useAppDispatch()
  useEffect(
    () => () => {
      dispatch(resPassActions.reset())
    },
    []
  )
}
