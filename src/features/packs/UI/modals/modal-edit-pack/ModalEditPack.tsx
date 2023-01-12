import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { BasicModal, ImageInputWithPreview } from '../../../../../common'
import { useAppDispatch } from '../../../../../state/store'
import { updatePack } from '../../../BLL/packsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'
import { checkFileSize } from '../../../../../services/checkFileSize'

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
  const fileInput = useRef<HTMLInputElement>(null)
  const params = UseSearchParamsObject()
  const dispatch = useAppDispatch()

  const [avatar, setAvatar] = useState<string>()
  const [packName, setPackName] = useState(initPackName || '')
  const [pending, setPending] = useState(false)
  const formHandler = (value: string) => setPackName(value)

  const [packIsPrivate, setPackIsPrivate] = useState(packType)
  const checkboxHandler = (value: boolean) => setPackIsPrivate(value)

  const editPackHandler = async () => {
    setPending(true)
    const action = await dispatch(
      updatePack({
        postData: {
          name: packName,
          _id: packId,
          private: packIsPrivate,
          deckCover: avatar,
        },
        params,
      })
    )
    if (updatePack.fulfilled.match(action)) {
      handleClose()
    }
    setPending(false)
  }
  const handleFileInput = (file: File) =>
    checkFileSize(file, setAvatar, dispatch, 300)

  const resetAvatar = () => {
    setAvatar('')
    if (fileInput.current && fileInput.current.value) {
      fileInput.current.value = ''
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
    </>
  )
}
