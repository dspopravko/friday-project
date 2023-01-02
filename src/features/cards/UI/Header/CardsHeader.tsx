import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../state/store'
import { HeaderButtonWithTitle } from '../../../../common/HeaderButtonWithTitle/HeaderButtonWithTitle'
import { PackMenu } from '../PackMenu/PackMenu'
import { ModalNewCard } from '../modals/modal-new-card/ModalNewCard'
import {
  cardsCurrentPackInfo,
  cardsPendingSelector,
} from '../../BLL/selectorsCards'
import { userIDSelector } from '../../../auth/common/selectors/selectorsAuth'
import { PATH } from '../../../../data/paths'
import { useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material'

type ModalNewCardType = {
  buttonTitle: 'Add new card' | 'Learn pack'
  id: string
}

export const CardsHeader = ({ id, buttonTitle }: ModalNewCardType) => {
  const currentPackInfo = useAppSelector(cardsCurrentPackInfo)
  const pending = useAppSelector(cardsPendingSelector)
  const currentUserID = useAppSelector(userIDSelector)
  const isOwner = currentPackInfo.packUserId === currentUserID

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const [image, setImage] = useState(currentPackInfo.packDeckCover)

  useEffect(() => {
    setImage(currentPackInfo.packDeckCover)
  }, [currentPackInfo.packDeckCover])

  const handleButtonClick = () => {
    if (isOwner) {
      handleOpen()
    } else {
      navigate(`/${PATH.LEARN}/${id}`)
    }
  }
  return (
    <>
      <HeaderButtonWithTitle
        title={currentPackInfo.packName}
        buttonTitle={buttonTitle}
        buttonCallback={handleButtonClick}
        pending={pending}
      >
        {isOwner && id && (
          <PackMenu
            packID={id}
            packName={currentPackInfo.packName}
            packType={currentPackInfo.packPrivate}
          />
        )}
      </HeaderButtonWithTitle>
      <ModalNewCard
        handleClose={handleClose}
        id={id}
        isOwner={isOwner}
        open={open}
      />
      {image && (
        <Paper
          sx={{ height: 150, width: 150, borderRadius: '12%', padding: 1 }}
        >
          <img
            alt={'pack cover'}
            style={{ width: '100%', height: '100%', borderRadius: '12%' }}
            onError={() => setImage('')}
            src={image}
          />
        </Paper>
      )}
    </>
  )
}
