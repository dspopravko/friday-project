import { Typography } from '@mui/material'
import { BasicModal } from '../../../../../common'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../../../state/store'
import { deleteCard } from '../../../BLL/cardsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalDeletePackType = {
  open: boolean
  handleClose: () => void
  cardId: string
  packId: string
  question: string
}

export const ModalDeleteCard = ({
  open,
  handleClose,
  cardId,
  packId,
  question,
}: ModalDeletePackType) => {
  const params = UseSearchParamsObject()
  const dispatch = useAppDispatch()
  const [pending, setPending] = useState(false)

  const deleteCardHandler = async () => {
    setPending(true)
    const action = await dispatch(
      deleteCard({ cardID: cardId, params, packId: packId })
    )
    if (deleteCard.fulfilled.match(action)) {
      handleClose()
    }
    setPending(false)
  }

  return (
    <>
      <BasicModal
        title={'Delete card'}
        buttonType={'delete'}
        handleClose={handleClose}
        open={open}
        buttonCallback={deleteCardHandler}
        pending={pending}
      >
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you really want to remove&nbsp;
          <span style={{ fontWeight: 600 }}>{question}</span>? Card will be
          deleted.
        </Typography>
      </BasicModal>
    </>
  )
}
