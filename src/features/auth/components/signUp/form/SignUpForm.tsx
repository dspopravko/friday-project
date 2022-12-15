import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { signUp } from '../../../services/signUp/signUpSlice'
import s from './SignUpForm.module.css'
import { defaultSchema } from '../../../services/validationSchema'

type RegistrationType = {
  email: string
  password: string
  passwordConfirmation: string
}

const schema = yup.object().shape({
  email: defaultSchema.email,
  password: defaultSchema.password,
  passwordConfirmation: yup
    .string()
    .label('confirm password')
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const SignUpForm = () => {
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
        label="confirm password"
        margin="normal"
        helperText={errors.passwordConfirmation?.message}
        error={!!errors.passwordConfirmation?.message}
        {...register('passwordConfirmation', { required: true })}
      />
      <Button variant={'contained'} disabled={isFetching} type="submit">
        Sign Up
      </Button>
    </form>
  )
}
