import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { login } from '../../../authSlice'
import s from './LoginForm.module.css'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
})

type LoginData = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const isFetching = useAppSelector((state) => state.auth.isFetching)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<LoginData> = (data) => dispatch(login(data))

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
        <TextField
          type="password"
          label="password"
          margin="normal"
          autoComplete={'password'}
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          {...register('password', { required: true })}
        />

        <FormControlLabel
          label={'Remember me'}
          sx={{
            marginLeft: 0,
            paddingTop: '6px',
            paddingBottom: '10px',
          }}
          control={
            <Checkbox {...register('rememberMe', { required: false })} />
          }
        />

        <Button variant={'contained'} disabled={isFetching} type="submit">
          Login in
        </Button>
      </form>
    </div>
  )
}
