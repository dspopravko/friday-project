import { Typography } from '@mui/material'
import React from 'react'
import { BasicModal } from '../Modal'

export const ModalDeleteCard = () => {
  return (
    <BasicModal title={'Delete card'} buttonType={'delete'}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Do you really want to remove Card Name? Card will be deleted.
      </Typography>
    </BasicModal>
  )
}
