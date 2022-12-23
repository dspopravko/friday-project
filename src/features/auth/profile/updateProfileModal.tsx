import React from 'react'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { UpdateProfileForm } from './updateProfileForm'
import { Close, DoneAll } from '@mui/icons-material'
import { useAppSelector } from '../../../state/store'
import { SuccessBig } from '../common/components/successBig'
import { FormError } from '../common/components/formError'
import { profileSelector } from '../selectorsAuth'

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
  const { updateSuccess, errors } = useAppSelector(profileSelector)
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update profile
        </Typography>
        {updateSuccess ? (
          <SuccessBig
            title={'Profile has been successfully updated!'}
            email={''}
            description={''}
          >
            <DoneAll />
          </SuccessBig>
        ) : (
          <>
            <UpdateProfileForm />
            <FormError error={errors} />
          </>
        )}
      </Box>
    </Modal>
  )
}
