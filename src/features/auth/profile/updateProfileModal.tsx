import React from 'react'
import { Box, Modal, Typography } from '@mui/material'
import { UpdataProfileForm } from './updataProfileForm'

type ModalPropsType = {
  open: boolean
  setOpen: (state: boolean) => void
  onClose: () => void
}
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
export const UpdateProfileModal = ({
  open,
  onClose,
  setOpen,
}: ModalPropsType) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update profile
        </Typography>
        <UpdataProfileForm setOpen={setOpen} />
      </Box>
    </Modal>
  )
}
