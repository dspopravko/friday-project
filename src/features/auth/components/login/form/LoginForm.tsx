import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import s from './LoginForm.module.css'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { login } from '../../../services/login/loginThunks'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../../../data/paths'

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
          padding: 0,
        }}
        control={
          <Checkbox
            sx={{ margin: 0 }}
            {...register('rememberMe', { required: false })}
          />
        }
      />
      <div style={{ marginBottom: '30px' }}>
        <NavLink
          replace
          to={PATH.LOGIN.RESTORE}
          style={{ textDecoration: 'none', color: '#000' }}
        >
          <Typography
            textAlign={'right'}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
              },
            }}
          >
            Forgot Password?
          </Typography>
        </NavLink>
      </div>
      <Button variant={'contained'} disabled={isFetching} type="submit">
        Login in
      </Button>
    </form>
  )
}
