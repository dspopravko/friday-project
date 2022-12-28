import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import { BasicModal } from '../Modal'
import React from 'react'
import { AddEntityButton } from '../../cards/common/components/AddEntityButton'
import { useAppDispatch } from '../../../state/store'
import { postPack } from '../../cards/packs/BLL/packsThunk'

type ModalNewPackType = {
  params?: any
}

export const ModalNewPack = (props: ModalNewPackType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useAppDispatch()
  const addPackHandler = () => {
    dispatch(
      postPack({
        postData: {
          cardsPack: {
            name: prompt('Whats new name?') || 'default',
          },
        },
        params: props.params,
      })
    )
  }

  return (
    <>
      <AddEntityButton
        title={'Packs'}
        buttonTitle={'Add new pack'}
        buttonCallback={handleOpen}
      />
      <BasicModal
        title={'Add new pack'}
        buttonType={'send'}
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
    </>
  )
}
