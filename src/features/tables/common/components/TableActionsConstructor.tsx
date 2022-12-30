import { Hooks, Row } from 'react-table'
import React from 'react'
import { PacksType } from '../../packs/BLL/packsSlice'
import { TableActionButtons } from '../../packs/UI/Table/TableActions/TableActionButtons'
import { CardType } from '../../cards/API/types'

//Здесь мы добавляем кнопку к каждой строчке
//todo: сделать actions
export const tableActionsConstructor =
  (
    sendAction: (type: string, payload: string) => void,
    userID: string,
    isCard = false
  ) =>
  (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Actions',
        Cell: ({ row }: { row: Row }) => {
          if (isCard) {
            const typedRow = row.original as CardType
            return (
              <TableActionButtons
                cardId={typedRow._id}
                packId={typedRow.cardsPack_id}
                dispatchAction={sendAction}
                isEmpty={true}
                isOwnUser={typedRow.user_id === userID}
                isCard={isCard}
                cardName={typedRow.question}
                answer={typedRow.answer}
              />
            )
          } else {
            const typedRow = row.original as PacksType
            return (
              <TableActionButtons
                packId={typedRow._id}
                dispatchAction={sendAction}
                isEmpty={typedRow.cardsCount > 0}
                isOwnUser={typedRow.user_id === userID}
                isCard={isCard}
                packName={typedRow.name}
                packType={typedRow.private}
              />
            )
          }
        },
      },
    ])
  }
