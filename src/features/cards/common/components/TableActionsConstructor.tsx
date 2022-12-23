import { Hooks, Row } from 'react-table'
import React from 'react'
import { PacksType } from '../../packs/BLL/packsSlice'
import { TableActionButtons } from '../../packs/VIEW/Table/TableActions/TableActionButtons'

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
          const typedRow = row.original as PacksType
          return (
            <>
              <TableActionButtons
                rowId={typedRow._id}
                dispatchAction={sendAction}
                isEmpty={typedRow.cardsCount < 1}
                isOwnUser={typedRow.user_id === userID}
                isCard={isCard}
              />
            </>
          )
        },
      },
    ])
  }
