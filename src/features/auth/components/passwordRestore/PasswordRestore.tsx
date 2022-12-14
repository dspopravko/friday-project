import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../../../context/context'
import s from '../login/form/LoginForm.module.css'
import { Button, Card, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restorePassword } from '../../services/login/loginThunks'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import * as yup from 'yup'
import { restoreEmail } from './restoreEmail'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../../data/paths'
import { theme } from '../../../../assets/mui-theme'

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

type PasswordRestoreDataType = {
  email: string // кому восстанавливать пароль
  // from: string //"test-front-admin <ai73a@yandex.by>", можно указать разработчика фронта)
  // message: string // хтмп-письмо, вместо $token$ бэк вставит токен
}

export const PasswordRestore = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  useEffect(() => {
    setTitle('Login page: restore password')
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRestoreDataType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()
  const isFetching = useAppSelector((state) => state.auth.isFetching)
  const onSubmit: SubmitHandler<PasswordRestoreDataType> = (data) => {
    console.log('click')
    dispatch(
      restorePassword({
        email: data.email,
        from: 'dspopravko',
        message: restoreEmail,
      })
    )
  }

  return (
    <Card className={'loginCanvas'}>
      <Typography variant={'h5'}>Forgot your password?</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="email"
          margin="normal"
          autoComplete={'username'}
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          {...register('email', { required: true })}
        />
        <Typography
          sx={{
            maxWidth: '70vw',
            opacity: 0.5,
            textAlign: 'left',
          }}
          component={'p'}
        >
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button variant={'contained'} disabled={isFetching} type="submit">
          Send instructions
        </Button>
      </form>
      <Typography textAlign={'center'}>
        Did you remember your password?
      </Typography>
      <NavLink
        replace
        to={'/' + PATH.LOGIN.MAIN}
        style={{
          textDecoration: 'underline',
          color: theme.palette.primary.light,
          marginBottom: '20px',
        }}
      >
        <Typography
          variant={'h6'}
          textAlign={'center'}
          sx={{
            '&:hover': {
              fontWeight: '600',
            },
          }}
        >
          Try logging in
        </Typography>
      </NavLink>
    </Card>
  )
}
