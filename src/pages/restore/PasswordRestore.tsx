import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { PATH } from '../../data/paths'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { SuccessBlock, SuggestBlock } from '../../common'
import { Email } from '@mui/icons-material'
import { RestoreForm } from '../../features/auth/restore/UI/restoreForm'
import { theme } from '../../assets/mui-theme'
import { resPassActions } from '../../features/auth/restore/BLL/restorePasswordSlice'
import { motion } from 'framer-motion'
import s from './PasswordRestore.module.css'

export const PasswordRestore = () => {
  useSetHeaderTitle('Restore password')
  resetState()
  const {
    restored,
    errors: serverErrors,
    isFetching,
    email,
  } = useAppSelector((state) => state.resPass)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.4 }}
      className={'loginCanvas'}
    >
      {restored ? (
        <>
          <SuccessBlock
            GoTo={{ title: 'Sign In', path: '/' + PATH.LOGIN.MAIN }}
            email={email}
          >
            <Email />
          </SuccessBlock>
        </>
      ) : (
        <>
          <Typography variant={'h5'}>Forgot your password?</Typography>
          <RestoreForm isFetching={isFetching} />
          <div className={s.suggestContainer}>
            <SuggestBlock
              question={'Did you remember your password?'}
              suggestion={'Try logging in'}
              path={'/' + PATH.LOGIN.MAIN}
            />
          </div>
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
