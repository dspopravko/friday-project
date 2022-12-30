import { Typography } from '@mui/material'
import { BasicModal } from '../Modal'
import deleteicon from '../../../assets/icons/delete.svg'
import s from './ModalDeleteItem.module.css'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../state/store'
import { deletePack } from '../../tables/packs/BLL/packsThunk'
import { deleteCard } from '../../tables/cards/BLL/cardsThunk'
import { PATH } from '../../../data/paths'

type ModalDeletePackType = {
  isOwnUser: boolean
  cardId: string | undefined
  packId: string
  packName: string | undefined
  cardName: string | undefined
  isCard: boolean
  hoverMenu?: boolean
  userID?: any
}

export const ModalDeleteItem = (props: ModalDeletePackType) => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const deleteCardHandler = async () => {
    if (props.cardId) {
      const action = await dispatch(
        deleteCard({ cardID: props.cardId, params, packId: props.packId })
      )
      if (deleteCard.fulfilled.match(action)) {
        handleClose()
      }
    }
  }
  const deletePackHandler = async () => {
    const action = await dispatch(deletePack({ packID: props.packId, params }))
    if (deletePack.fulfilled.match(action) && props.hoverMenu) {
      handleClose()
      navigate(`/${PATH.PACKS}/?user_id=${props.userID}`)
    }
    if (deletePack.fulfilled.match(action)) {
      handleClose()
    }
  }
  const title = props.isCard ? 'Delete card' : 'Delete pack'
  const pageText = props.isCard
    ? 'Card will be deleted'
    : 'All tables will be deleted'
  const textTitle = props.cardName ? props.cardName : props.packName

  return (
    <>
      {props.hoverMenu && (
        <button
          className={s.button}
          style={{ visibility: props.isOwnUser ? 'visible' : 'hidden' }}
          onClick={handleOpen}
        >
          <img alt={'Delete'} src={deleteicon} /> Delete
        </button>
      )}
      {!props.hoverMenu && (
        <button
          className={s.button}
          style={{ visibility: props.isOwnUser ? 'visible' : 'hidden' }}
          onClick={handleOpen}
        >
          <img alt={'Delete'} src={deleteicon} />
        </button>
      )}
      <BasicModal
        title={title}
        buttonType={'delete'}
        handleClose={handleClose}
        open={open}
        buttonCallback={props.isCard ? deleteCardHandler : deletePackHandler}
      >
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you really want to remove {textTitle}? {pageText}.
        </Typography>
      </BasicModal>
    </>
  )
}
