import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../../../context/context'
import s from '../login/form/LoginForm.module.css'
import { Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restorePassword } from '../../authThunks'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import * as yup from 'yup'
import { restoreEmail } from './restoreEmail'

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
    <div style={{ margin: '0 auto', width: '50%' }}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="email"
          margin="normal"
          autoComplete={'username'}
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          {...register('email', { required: true })}
        />
        <Button variant={'contained'} disabled={isFetching} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
