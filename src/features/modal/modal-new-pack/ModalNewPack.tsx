import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import { BasicModal } from '../Modal'
import React from 'react'
import { AddEntityButton } from '../../tables/common/components/AddEntityButton'
import { useAppDispatch } from '../../../state/store'
import { postPack } from '../../tables/packs/BLL/packsThunk'

type ModalNewPackType = {
  params?: any
}

export const ModalNewPack = (props: ModalNewPackType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const [packName, setPackName] = React.useState<string>('')
  const formHandler = (value: string) => {
    setPackName(value)
  }
  const [packIsPrivate, setPackIsPrivate] = React.useState<boolean>(true)
  const checkboxHandler = (value: boolean) => {
    setPackIsPrivate(value)
  }
  const dispatch = useAppDispatch()
  const addPackHandler = async () => {
    const action = await dispatch(
      postPack({
        postData: {
          cardsPack: {
            name: packName,
            private: packIsPrivate,
          },
        },
        params: props.params,
      })
    )
    if (postPack.fulfilled.match(action)) {
      setPackName('')
      setPackIsPrivate(true)
      handleClose()
    }
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
        buttonCallback={addPackHandler}
        handleClose={handleClose}
        open={open}
      >
        <FormControl fullWidth>
          <TextField
            id="standard-required"
            label="Name Pack"
            defaultValue="Name Pack"
            value={packName}
            onChange={(e) => formHandler(e.target.value)}
            variant="standard"
            sx={{ marginBottom: '20px', marginTop: '20px' }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  value={packIsPrivate}
                  onChange={() => checkboxHandler(!packIsPrivate)}
                />
              }
              label="Private Pack"
            />
          </FormGroup>
        </FormControl>
      </BasicModal>
    </>
  )
}
