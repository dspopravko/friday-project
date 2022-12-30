import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Typography } from '@mui/material'
import { useAppSelector } from '../../state/store'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { NewPasswordForm } from '../../features/auth/newPassword/UI/NewPasswordForm'
import { SuccessBig } from '../../features/auth/common/components/successBig'
import { PATH } from '../../data/paths'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { theme } from '../../assets/mui-theme'
import { newPasswordStateSelector } from '../../features/auth/common/selectors/selectorsAuth'

export const NewPassword = () => {
  const { token } = useParams()
  useSetHeaderTitle('Setup new password')
  const {
    isSet,
    errors: serverErrors,
    isFetching,
  } = useAppSelector(newPasswordStateSelector)

  return (
    <Card className={'loginCanvas'}>
      {isSet ? (
        <>
          <SuccessBig
            title={'Your password has been successfully updated'}
            email={'You can now login'}
            description={'👇'}
            GoTo={{
              title: 'Login page',
              path: '/' + PATH.LOGIN.MAIN,
            }}
          >
            <DoneAllIcon />
          </SuccessBig>
        </>
      ) : (
        <>
          <Typography variant={'h5'}> Create new password</Typography>
          Token is: {token}
          <NewPasswordForm token={token as string} isFetching={isFetching} />
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
