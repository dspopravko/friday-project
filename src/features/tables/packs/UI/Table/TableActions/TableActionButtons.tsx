import React from 'react'
import teachicon from '../../../../../../assets/icons/teach.svg'
import s from './TableActionButtons.module.css'
import { ModalDeleteItem } from '../../../../../modal/modal-delete-item/ModalDeleteItem'
import { ModalEditPack } from '../../../../../modal/modal-edit-pack/ModalEditPack'
import { ModalEditCard } from '../../../../../modal/modal-edit-card/ModalEditCard'

type TableActionButtonsPropsType = {
  isCard?: boolean
  isEmpty: boolean
  cardId?: string
  packId: string
  isOwnUser: boolean
  dispatchAction: (type: string, rowId: string) => void
  packName?: string
  cardName?: string
  packType?: boolean
  answer?: string
}

export const TableActionButtons = ({
  isEmpty,
  isOwnUser,
  dispatchAction,
  isCard = false,
  packName,
  cardName,
  cardId,
  packId,
  packType,
  answer,
}: TableActionButtonsPropsType) => {
  return (
    <div className={s.buttonGroup}>
      {!isCard && (
        <button
          className={s.button}
          style={{ visibility: isCard ? 'hidden' : 'visible' }}
          disabled={isEmpty}
          onClick={() => {
            dispatchAction('learn', packId)
          }}
        >
          <img alt={'learn'} src={teachicon} />
        </button>
      )}
      {isOwnUser && (
        <ModalDeleteItem
          isOwnUser={isOwnUser}
          cardId={cardId}
          packId={packId}
          packName={packName}
          cardName={cardName}
          isCard={isCard}
        />
      )}
      {isOwnUser && isCard ? (
        <ModalEditCard
          isOwnUser={isOwnUser}
          cardId={cardId}
          packId={packId}
          packName={packName}
          cardName={cardName}
          packType={packType}
          answer={answer}
        />
      ) : (
        <ModalEditPack
          isOwnUser={isOwnUser}
          packId={packId}
          packName={packName}
          packType={packType}
        />
      )}
    </div>
  )
}
