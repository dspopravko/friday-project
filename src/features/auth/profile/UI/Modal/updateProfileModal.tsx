import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { profileSelector } from '../../../common/selectors/selectorsAuth'
import {
  BasicModal,
  ImageInputWithPreview,
  FormError,
} from '../../../../../common'
import s from '../../../login/UI/LoginForm.module.css'
import { LoginData } from '../updateProfileContainer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { updateProfile } from '../../BLL/profileThunk'
import { checkFileSize } from '../../../../../services/checkFileSize'

type ModalPropsType = {
  open: boolean
  onClose: () => void
}
const schema = yup.object().shape({
  name: yup.string().min(3).max(20),
})

export const UpdateProfileModal = ({ open, onClose }: ModalPropsType) => {
  const { errors: serverErrors } = useAppSelector(profileSelector)
  const { user, pending } = useAppSelector(profileSelector)
  const [avatar, setAvatar] = useState<string>()
  const dispatch = useAppDispatch()

  const handlFileInput = async (file: File) =>
    checkFileSize(file, setAvatar, dispatch, 600)

  const handleSubmission = async () => {
    const data = getValues()
    const action = await dispatch(
      updateProfile({
        name: data.name,
        avatar,
      })
    )
    if (updateProfile.fulfilled.match(action)) {
      reset()
      setAvatar('')
      onClose()
    }
  }

  const {
    register,
    resetField,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const resetFileInput = () => {
    setAvatar('')
    resetField('avatar')
  }

  return (
    <BasicModal
      open={open}
      handleClose={onClose}
      buttonType={'save'}
      title={'Update Profile'}
      buttonCallback={() => handleSubmission()}
    >
      <form
        onSubmit={handleSubmit(handleSubmission)}
        className={s.form}
        style={{
          opacity: pending ? '0.5' : '1',
        }}
      >
        <ImageInputWithPreview
          avatar={avatar}
          deleteImage={resetFileInput}
          handleFileInput={handlFileInput}
        />
        <TextField
          label="name"
          margin="normal"
          autoComplete={'username'}
          defaultValue={user.name}
          helperText={errors.name?.message}
          error={!!errors.name?.message}
          {...register('name', { required: false })}
        />
      </form>
      <FormError error={serverErrors} />
    </BasicModal>
  )
}
