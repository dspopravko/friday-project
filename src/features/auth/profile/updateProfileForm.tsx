import React from 'react'
import s from '../login/form/LoginForm.module.css'
import { Button, TextField } from '@mui/material'
import XButton from '../../../common/components/button/XButton'
import { dispatchProfileData } from './services/dispatchProfileData'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginData } from './updateProfileContainer'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import * as yup from 'yup'
import { profileSelector } from '../selectorsAuth'

const schema = yup.object().shape({
  name: yup.string().min(3),
})
export const UpdateProfileForm = () => {
  const { user, pending } = useAppSelector(profileSelector)
  const dispatch = useAppDispatch()
  const handleSubmission = async (data: LoginData) => {
    await dispatchProfileData(data, dispatch)
    resetField('avatar')
  }
  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<LoginData> = (data) => handleSubmission(data)
  const resetFileInput = () => resetField('avatar')
  //определяем весит ли файл на инпуте, если да - показываем кнопку очистки
  let selectedFile
  if (watch('avatar')) {
    const item = watch('avatar').item(0)
    if (item) {
      selectedFile = item
    }
  }
  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        opacity: pending ? '0.5' : '1',
      }}
    >
      <Button variant="outlined" component="label">
        Upload Photo
        <input
          type="file"
          accept="image/png, image/jpeg"
          hidden
          {...register('avatar', { required: false })}
        />
      </Button>
      {selectedFile && (
        <div>
          {selectedFile.name}
          <XButton type={'delete'} onClick={resetFileInput}>
            delete
          </XButton>
        </div>
      )}
      <TextField
        label="name"
        margin="normal"
        autoComplete={'username'}
        defaultValue={user.name}
        helperText={errors.name?.message}
        error={!!errors.name?.message}
        {...register('name', { required: false })}
      />
      <Button type="submit" disabled={pending}>
        Update profile
      </Button>
    </form>
  )
}
