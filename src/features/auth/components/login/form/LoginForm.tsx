import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../../../../state/store'
import { login } from '../../../authSlice'
import s from './LoginForm.module.css'
import { Button } from '@mui/material'

type LoginData = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>()
  const onSubmit: SubmitHandler<LoginData> = (data) => dispatch(login(data))

  console.log(watch('email')) // watch input value by passing the name of it

  return (
    <div style={{ margin: '0 auto', width: '50%' }}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue="nya-admin@nya.nya"
          {...register('email', { required: true })}
        />
        <input
          defaultValue="1qazxcvBG"
          {...register('password', { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <Button variant={'contained'} type="submit">
          Login in
        </Button>
      </form>
    </div>
  )
}
