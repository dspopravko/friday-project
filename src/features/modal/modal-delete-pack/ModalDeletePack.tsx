import { Typography } from '@mui/material'
import { BasicModal } from '../Modal'
import React from 'react'

export const ModalDeletePack = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <BasicModal
      title={'Delete pack'}
      buttonType={'delete'}
      handleClose={handleClose}
      open={open}
    >
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Do you really want to remove Pack Name? All cards will be deleted.
      </Typography>
    </BasicModal>
  )
}
