import React from 'react'
import { LoginForm } from '../../features/auth/login/form/LoginForm'
import { Card, Typography } from '@mui/material'
import { PATH } from '../../data/paths'
import { setTitle } from '../../services/setHeaderTitle'
import { SuggestBlock } from '../../features/auth/common/components/suggestBlock'
import { useAppSelector } from '../../state/store'
import { Navigate } from 'react-router-dom'
import { isAuthSelector } from '../../features/auth/selectorsAuth'
import { ModalDeleteCard } from '../../features/modal/modal-delete-card/ModalDeleteCard'
import { ModalDeletePack } from '../../features/modal/modal-delete-pack/ModalDeletePack'
import { ModalEditCard } from '../../features/modal/modal-edit-card/ModalEditCard'
import { ModalNewCard } from '../../features/modal/modal-new-card/ModalNewCard'
import { ModalNewPack } from '../../features/modal/modal-new-pack/ModalNewPack'

export const Login = () => {
  setTitle('Login', 'Login')
  const isAuth = useAppSelector(isAuthSelector)
  if (isAuth) {
    return <Navigate to={'/' + PATH.PROFILE} />
  }
  return (
    <Card className={'loginCanvas'}>
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
    </Card>
  )
}
