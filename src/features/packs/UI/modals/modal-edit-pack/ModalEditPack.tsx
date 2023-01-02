import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { BasicModal } from '../../../../../common/Modal/Modal'
import { useAppDispatch } from '../../../../../state/store'
import { updatePack } from '../../../BLL/packsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalEditPackType = {
  open: boolean
  handleClose: () => void
  packId: string
  packName: string
  packType: boolean
}

export const ModalEditPack = ({
  open,
  handleClose,
  packId,
  packName: initPackName,
  packType,
}: ModalEditPackType) => {
  const params = UseSearchParamsObject()
  const dispatch = useAppDispatch()

  const [packName, setPackName] = useState(initPackName || '')
  const formHandler = (value: string) => setPackName(value)

  const [packIsPrivate, setPackIsPrivate] = useState(packType)
  const checkboxHandler = (value: boolean) => setPackIsPrivate(value)

  const editPackHandler = async () => {
    const action = await dispatch(
      updatePack({
        postData: {
          name: packName,
          _id: packId,
          private: packIsPrivate,
        },
        params,
      })
    )
    if (updatePack.fulfilled.match(action)) {
      handleClose()
    }
  }

  return (
    <>
      <BasicModal
        title={'Edit pack'}
        buttonType="save"
        handleClose={handleClose}
        open={open}
        buttonCallback={editPackHandler}
      >
        <FormControl fullWidth>
          <TextField
            label="Name Pack"
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
    </>
  )
}
