import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import s from './LoginForm.module.css'
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { login } from '../BLL/loginThunks'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../../data/paths'
import { defaultSchema } from '../../common/validation/validationSchema'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { isAuthFetching } from '../../common/selectors/selectorsAuth'

const schema = yup.object().shape({
  email: defaultSchema.email,
  password: defaultSchema.password,
})

type LoginData = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

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
          to={'/' + PATH.LOGIN.RESTORE}
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
