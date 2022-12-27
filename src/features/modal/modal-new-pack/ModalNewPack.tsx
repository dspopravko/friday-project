import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import { BasicModal } from '../Modal'
import React from 'react'

export const ModalNewPack = () => {
  return (
    <BasicModal title={'Add new pack'} buttonType={'send'}>
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
