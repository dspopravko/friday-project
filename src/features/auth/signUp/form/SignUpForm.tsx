import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import s from './SignUpForm.module.css'
import { defaultSchema } from '../../common/validation/validationSchema'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { isAuthFetching } from '../../common/selectors/selectorsAuth'
import { signUp } from '../services/signUpThunk'

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
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword1, setShowPassword1] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const dispatch = useAppDispatch()
  const isFetching = useAppSelector(isAuthFetching)
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
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="password"
        margin="normal"
        helperText={errors.password?.message}
        error={!!errors.password?.message}
        {...register('password', { required: true })}
      />
      <TextField
        type={showPassword1 ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
