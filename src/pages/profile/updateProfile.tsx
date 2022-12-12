import React, { useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { fileToBase64 } from '../../services/fileToBase64'
import { updateProfile } from '../../features/auth/authThunks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import s from '../../features/auth/components/login/form/LoginForm.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const schema = yup.object().shape({
  name: yup.string().min(3),
  password: yup.string().min(8).max(32).required(),
})

type LoginData = {
  name?: string
  password: string
  avatar: FileList
}

export const ProfilePhoto = () => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleSubmission = async (data: LoginData) => {
    console.log(data.avatar[0])
    let photo
    if (data.avatar) {
      photo = await fileToBase64(data.avatar[0])
    }

    setOpen(false)
    dispatch(
      updateProfile({
        name: data.name,
        avatar: photo as string,
        password: data.password,
      })
    )
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<LoginData> = (data) => handleSubmission(data)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <div>
      <Badge
        badgeContent={
          <IconButton onClick={handleOpen}>
            <CameraAltIcon />
          </IconButton>
        }
        showZero
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Choose photo
            </Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <Input
                type={'file'}
                {...register('avatar', { required: false })}
              />
              <TextField
                label="name"
                margin="normal"
                autoComplete={'username'}
                helperText={errors.name?.message}
                error={!!errors.name?.message}
                {...register('name', { required: false })}
              />
              <TextField
                type="password"
                label="password"
                margin="normal"
                autoComplete={'password'}
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                {...register('password', { required: true })}
              />

              <Button variant={'contained'} type="submit">
                Update profile
              </Button>
            </form>
          </Box>
        </Modal>

        <Avatar
          alt={'Foto user'}
          src={user.avatar}
          sx={{ width: 96, height: 96 }}
        />
      </Badge>
    </div>
  )
}
