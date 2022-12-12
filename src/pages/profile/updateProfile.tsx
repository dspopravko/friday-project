import React, { ChangeEvent, useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Input,
  Modal,
  Typography,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { useAppSelector } from '../../state/store'
import XButton from '../../common/components/button/XButton'
import { authApi } from '../../features/auth/services/auth-api'
import { fileToBase64 } from '../../services/fileToBase64'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export const ProfilePhoto = () => {
  const user = useAppSelector((state) => state.auth.user)
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>()
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }
  const handleSubmission = async () => {
    if (!selectedFile) {
      return
    }
    const photo = await fileToBase64(selectedFile)
    await authApi.updateUser({
      name: 'Demid',
      avatar: photo as string,
    })
  }
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
            <Input type={'file'} onChange={changeHandler} />
            <XButton onClick={handleSubmission}>Upload this photo</XButton>
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
