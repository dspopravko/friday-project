import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import { BasicModal, ImageInputWithPreview } from '../../../../../common'
import React, { useRef, useState } from 'react'
import { useAppDispatch } from '../../../../../state/store'
import { postPack } from '../../../BLL/packsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'
import { checkFileSize } from '../../../../../services/checkFileSize'

type ModalNewPackPropsType = {
  open: boolean
  handleClose: () => void
}

export const ModalNewPack = ({ open, handleClose }: ModalNewPackPropsType) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<string>()

  const params = UseSearchParamsObject()
  const [packName, setPackName] = useState<string>('')
  const [pending, setPending] = useState(false)
  const formHandler = (value: string) => setPackName(value)

  const [packIsPrivate, setPackIsPrivate] = useState<boolean>(false)
  const checkboxHandler = (value: boolean) => setPackIsPrivate(value)

  const dispatch = useAppDispatch()
  const addPackHandler = async () => {
    setPending(true)
    const action = await dispatch(
      postPack({
        postData: {
          cardsPack: {
            name: packName,
            private: packIsPrivate,
            deckCover: avatar,
          },
        },
        params,
      })
    )
    if (postPack.fulfilled.match(action)) {
      setPackName('')
      handleClose()
    }
    setPending(false)
    setPackIsPrivate(false)
  }
  const handleFileInput = (file: File) =>
    checkFileSize(file, setAvatar, dispatch)

  const resetAvatar = () => {
    setAvatar('')
    if (fileInput.current && fileInput.current.value) {
      fileInput.current.value = ''
    }
  }

  return (
    <BasicModal
      title={'Add new pack'}
      buttonType={'send'}
      buttonCallback={addPackHandler}
      handleClose={handleClose}
      open={open}
      pending={pending}
    >
      <FormControl fullWidth>
        <TextField
          label="Name Pack"
          value={packName}
          onChange={(e) => formHandler(e.target.value)}
          variant="standard"
          sx={{ marginBottom: '20px', marginTop: '20px' }}
        />
        <ImageInputWithPreview
          title={'Upload deck cover'}
          deleteImage={resetAvatar}
          avatar={avatar}
          handleFileInput={handleFileInput}
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
