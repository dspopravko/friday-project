import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import { BasicModal } from '../../../../../common/Modal/Modal'
import React from 'react'
import { useAppDispatch } from '../../../../../state/store'
import { postPack } from '../../../BLL/packsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalNewPackPropsType = {
  open: boolean
  handleClose: () => void
}

export const ModalNewPack = ({ open, handleClose }: ModalNewPackPropsType) => {
  const params = UseSearchParamsObject()
  const [packName, setPackName] = React.useState<string>('')
  const formHandler = (value: string) => {
    setPackName(value)
  }
  const [packIsPrivate, setPackIsPrivate] = React.useState<boolean>(false)
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
        params,
      })
    )
    if (postPack.fulfilled.match(action)) {
      setPackName('')
      setPackIsPrivate(true)
      handleClose()
    }
  }

  return (
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
                checked={packIsPrivate}
                onChange={() => checkboxHandler(!packIsPrivate)}
              />
            }
            label="Private Pack"
          />
        </FormGroup>
      </FormControl>
    </BasicModal>
  )
}
