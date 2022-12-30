import React from 'react'
import { useAppSelector } from '../../../../../state/store'
import { AddEntityButton } from '../../../common/components/AddEntityButton'
import { HoverMenu } from '../../../../learn/UI/hoverMenu/HoverMenu'
import { ModalNewCard } from '../../../../modal/modal-new-card/ModalNewCard'
import {
  cardsCurrentPackInfo,
  cardsPendingSelector,
} from '../../BLL/selectorsCards'
import { userIDSelector } from '../../../../auth/common/selectors/selectorsAuth'
import { PATH } from '../../../../../data/paths'
import { useNavigate } from 'react-router-dom'

type ModalNewCardType = {
  buttonTitle: 'Add new card' | 'Learn pack'
  id: string | undefined
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

  const handleButtonClick = () => {
    if (isOwner) {
      handleOpen()
    } else {
      navigate(`/${PATH.LEARN}/${id}`)
    }
  }
  return (
    <>
      <AddEntityButton
        title={currentPackInfo.packName}
        buttonTitle={buttonTitle}
        buttonCallback={handleButtonClick}
        pending={pending}
      >
        {isOwner && id && (
          <HoverMenu
            packID={id}
            packName={currentPackInfo.packName}
            packType={currentPackInfo.packPrivate}
            isOwnUser={isOwner}
          />
        )}
      </AddEntityButton>
      <ModalNewCard
        handleClose={handleClose}
        id={id}
        isOwner={isOwner}
        open={open}
      />
    </>
  )
}
