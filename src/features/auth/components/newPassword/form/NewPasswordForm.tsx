import React from 'react'
import s from '../../login/form/LoginForm.module.css'
import { Button, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { defaultSchema } from '../../../services/validationSchema'
import { useAppDispatch } from '../../../../../state/store'
import { newPassword } from '../../../services/newPassword/newPasswordSlice'

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
        type="password"
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
