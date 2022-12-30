import React from 'react'
import s from '../../login/UI/LoginForm.module.css'
import { Button, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch } from '../../../../state/store'
import { restoreEmail } from '../services/restoreEmail'
import * as yup from 'yup'
import { defaultSchema } from '../../common/validation/validationSchema'
import { restorePassword } from '../BLL/restorePasswordThunk'

const schema = yup.object().shape({
  email: defaultSchema.email,
})

type PasswordRestoreDataType = {
  email: string
}

export const RestoreForm = ({ isFetching }: { isFetching: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRestoreDataType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<PasswordRestoreDataType> = (data) => {
    dispatch(
      restorePassword({
        email: data.email,
        from: 'https://t.me/dspopravko',
        message: restoreEmail,
      })
    )
  }

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
  )
}
