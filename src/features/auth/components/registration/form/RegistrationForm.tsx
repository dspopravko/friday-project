import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { signUp } from './registrationSlice'
import s from './RegistrationForm.module.css'

type RegistrationType = {
  email: string
  password: string
  passwordConfirmation: string
}

export const RegistrationForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })

  const dispatch = useAppDispatch()
  const isFetching = useAppSelector((state) => state.auth.isFetching)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<RegistrationType> = (data) =>
    dispatch(signUp(data))

  return (
    <div style={{ margin: '0 auto', width: '50%' }}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="email"
          margin="normal"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          {...register('email', { required: true })}
        />
        <TextField
          type="password"
          label="password"
          margin="normal"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          {...register('password', { required: true })}
        />
        <TextField
          type="password"
          label="passwordConfirmation"
          margin="normal"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          {...register('passwordConfirmation', { required: true })}
        />

        <Button variant={'contained'} disabled={isFetching} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  )
}
