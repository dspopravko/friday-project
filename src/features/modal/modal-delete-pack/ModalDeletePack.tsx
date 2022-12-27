import { Typography } from '@mui/material'
import { BasicModal } from '../Modal'
import React from 'react'

export const ModalDeletePack = () => {
  return (
    <BasicModal title={'Delete pack'} buttonType={'delete'}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Do you really want to remove Pack Name? All cards will be deleted.
      </Typography>
    </BasicModal>
  )
}
