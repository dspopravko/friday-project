import React, { ChangeEvent, useState } from 'react'
import { Button, Paper, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { FormError } from '../../../common/components/formError'
import { profileSelector } from '../../../common/selectors/selectorsAuth'
import { BasicModal } from '../../../../../common/Modal/Modal'
import s from '../../../login/UI/LoginForm.module.css'
import XButton from '../../../../../common/Button/XButton'
import { LoginData } from '../updateProfileContainer'
import { fileFromInputToBase64 } from '../../BLL/fileFromInputToBase64'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { updateProfile } from '../../BLL/profileThunk'
import { theme } from '../../../../../assets/mui-theme'
import { handleServerAppError } from '../../../../../services/error-notification'

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

  const hanleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    await onChangeFileInput(e)
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
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

  const resetFileInput = () => resetField('avatar')
  const { onChange: onChangeFileInput, ...restAvatarProps } = register(
    'avatar',
    {
      required: false,
    }
  )
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
        <Button variant="outlined" component="label">
          Upload Photo
          <input
            type="file"
            accept="image/png, image/jpeg"
            hidden
            {...restAvatarProps}
            onChange={hanleFileInput}
          />
        </Button>
        {avatar && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: theme.palette.grey.A200,
              margin: '10px auto 0 auto',
              width: '120px',
            }}
          >
            <Paper
              sx={{ width: 80, height: 80, borderRadius: '50%' }}
              variant="outlined"
            >
              <img
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                src={avatar}
                alt={'selected image'}
              />
            </Paper>
            <XButton
              type={'delete'}
              onClick={() => {
                resetFileInput()
                setAvatar('')
              }}
            >
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
      </form>
      <FormError error={serverErrors} />
    </BasicModal>
  )
}
