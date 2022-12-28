import { Typography } from '@mui/material'
import React from 'react'
import { BasicModal } from '../Modal'

export const ModalDeleteCard = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <BasicModal
      title={'Delete card'}
      buttonType={'delete'}
      handleClose={handleClose}
      open={open}
    >
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Do you really want to remove Card Name? Card will be deleted.
      </Typography>
    </BasicModal>
  )
}
