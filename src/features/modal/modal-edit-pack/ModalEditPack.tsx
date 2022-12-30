import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import React from 'react'
import { BasicModal } from '../Modal'
import s from './ModalEditPack.module.css'
import editicon from '../../../assets/icons/edit.svg'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../state/store'
import { updatePack } from '../../tables/packs/BLL/packsThunk'

type ModalEditPackType = {
  isOwnUser: boolean
  packId: string
  packName: string | undefined
  packType: boolean | undefined
}

export const ModalEditPack = ({
  packType,
  packId,
  packName: initPackName,
  isOwnUser,
}: ModalEditPackType) => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [packName, setPackName] = React.useState<string>(initPackName || '')
  const formHandler = (value: string) => {
    setPackName(value)
  }
  const [packIsPrivate, setPackIsPrivate] = React.useState<boolean>(!!packType)
  const checkboxHandler = (value: boolean) => {
    setPackIsPrivate(value)
  }
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
  const title = 'Edit pack'
  return (
    <>
      <button
        className={s.button}
        style={{ visibility: isOwnUser ? 'visible' : 'hidden' }}
        onClick={handleOpen}
      >
        <img alt={'Edit'} src={editicon} />
      </button>
      <BasicModal
        title={title}
        buttonType="save"
        handleClose={handleClose}
        open={open}
        buttonCallback={editPackHandler}
      >
        <FormControl fullWidth>
          <TextField
            id="standard-required"
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
