import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import React from 'react'
import { BasicModal } from '../Modal'

export const ModalEditPack = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <BasicModal
      title={'Edit pack'}
      buttonType="save"
      handleClose={handleClose}
      open={open}
    >
      <FormControl fullWidth>
        <TextField
          id="standard-required"
          label="Name Pack"
          defaultValue="Name Pack"
          variant="standard"
          sx={{ marginBottom: '20px', marginTop: '20px' }}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Private Pack"
          />
        </FormGroup>
      </FormControl>
    </BasicModal>
  )
}
