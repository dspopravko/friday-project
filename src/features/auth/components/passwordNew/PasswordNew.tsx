import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../../../context/context'
import { useParams } from 'react-router-dom'
import { Button, Card, TextField, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { setNewPassword } from '../../authThunks'
import s from '../login/form/LoginForm.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup.string().min(8).max(32).required(),
})

type PasswordNewDataType = {
  password: string
}

export const PasswordNew = () => {
  const { token } = useParams()
  const dispatch = useAppDispatch()
  const { setTitle } = useContext(HeaderTitleContext)
  useEffect(() => {
    setTitle('Setup new password')
  }, [])

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
