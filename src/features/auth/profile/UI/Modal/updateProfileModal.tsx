import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { FormError } from '../../../common/components/formError'
import { profileSelector } from '../../../common/selectors/selectorsAuth'
import { BasicModal } from '../../../../../common/Modal/Modal'
import s from '../../../login/UI/LoginForm.module.css'
import { LoginData } from '../updateProfileContainer'
import { fileFromInputToBase64 } from '../../BLL/fileFromInputToBase64'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { updateProfile } from '../../BLL/profileThunk'
import { handleServerAppError } from '../../../../../services/error-notification'
import { ImageInputWithPreview } from '../../../../../common/ImageInputWithPreview/ImageInputWithPreview'

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

  const handlFileInput = async (file: File) => {
    if (file.size < 300000) {
      const avatar = await fileFromInputToBase64(file)
      setAvatar(avatar)
    } else {
      handleServerAppError(
        { error: 'Maximum file size (300 kb) exceeded' },
        dispatch
      )
    }
  }

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
