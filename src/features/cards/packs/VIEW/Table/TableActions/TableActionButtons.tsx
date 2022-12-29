import React from 'react'
import teachicon from '../../../../../../assets/icons/teach.svg'
import s from './TableActionButtons.module.css'
import { ModalDeletePack } from '../../../../../modal/modal-delete-pack/ModalDeletePack'
import { ModalEditPack } from '../../../../../modal/modal-edit-pack/ModalEditPack'

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
        <ModalDeletePack
          isOwnUser={isOwnUser}
          cardId={cardId}
          packId={packId}
          packName={packName}
          cardName={cardName}
          isCard={isCard}
        />
      )}
      {isOwnUser && (
        <ModalEditPack
          isOwnUser={isOwnUser}
          cardId={cardId}
          packId={packId}
          packName={packName}
          cardName={cardName}
          isCard={isCard}
          packType={packType}
          answer={answer}
        />
      )}
    </div>
  )
}
