import React from 'react'
import s from '../../login/form/LoginForm.module.css'
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { defaultSchema } from '../../common/validation/validationSchema'
import { useAppDispatch } from '../../../../state/store'
import { newPassword } from '../services/newPasswordSlice'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const schema = yup.object().shape({
  password: defaultSchema.password,
})

type PasswordNewDataType = {
  password: string
}
export const NewPasswordForm = ({
  token,
  isFetching,
}: {
  token: string
  isFetching: boolean
}) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordNewDataType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<PasswordNewDataType> = (data) =>
    dispatch(
      newPassword({
        password: data.password,
        resetPasswordToken: token as string,
      })
    )
  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
      <Typography
        sx={{
          opacity: 0.5,
          textAlign: 'left',
        }}
        component={'p'}
      >
        Create new password and we will send you further instructions to email
      </Typography>
      <Button variant={'contained'} disabled={isFetching} type="submit">
        Create new password
      </Button>
    </form>
  )
}
