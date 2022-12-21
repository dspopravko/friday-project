import React from 'react'
import teachicon from '../../../../../../assets/icons/teach.svg'
import deleteicon from '../../../../../../assets/icons/delete.svg'
import editicon from '../../../../../../assets/icons/edit.svg'
import s from './TableActionButtons.module.css'

type TableActionButtonsPropsType = {
  isCard?: boolean
  isEmpty: boolean
  rowId: string
  isOwnUser: boolean
  dispatchAction: (type: string, rowId: string) => void
}

export const TableActionButtons = ({
  isEmpty,
  rowId,
  isOwnUser,
  dispatchAction,
  isCard = false,
}: TableActionButtonsPropsType) => {
  return (
    <div>
      <button
        className={s.button}
        style={{ visibility: isCard ? 'hidden' : 'visible' }}
        disabled={isEmpty}
        onClick={() => {
          dispatchAction('learn', rowId)
        }}
      >
        <img alt={'learn'} src={teachicon} />
      </button>
      <button
        className={s.button}
        style={{ visibility: isOwnUser ? 'visible' : 'hidden' }}
        onClick={() => {
          dispatchAction('delete', rowId)
        }}
      >
        <img alt={'Delete'} src={deleteicon} />
      </button>
      <button
        className={s.button}
        style={{ visibility: isOwnUser ? 'visible' : 'hidden' }}
        onClick={() => {
          dispatchAction('edit', rowId)
        }}
      >
        <img alt={'Edit'} src={editicon} />
      </button>
    </div>
  )
}
