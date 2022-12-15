import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, TextField, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { setNewPassword } from '../../services/login/loginThunks'
import s from '../login/form/LoginForm.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { defaultSchema } from '../../services/validationSchema'
import { setTitle } from '../../../../services/setHeaderTitle'

const schema = yup.object().shape({
  password: defaultSchema.password,
})

type PasswordNewDataType = {
  password: string
}

export const PasswordNew = () => {
  const { token } = useParams()
  const dispatch = useAppDispatch()
  setTitle('Setup new password')

  const isFetching = useAppSelector((state) => state.auth.isFetching)
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
      setNewPassword({
        password: data.password,
        resetPasswordToken: token as string,
      })
    )

  return (
    <div className="pageContainer">
      <Card className={'loginCanvas'}>
        <Typography variant={'h5'}> Create new password</Typography>
        Token is: {token}
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
            Create new password and we will send you further instructions to
            email
          </Typography>
          <Button variant={'contained'} disabled={isFetching} type="submit">
            Create new password
          </Button>
        </form>
      </Card>
    </div>
  )
}
