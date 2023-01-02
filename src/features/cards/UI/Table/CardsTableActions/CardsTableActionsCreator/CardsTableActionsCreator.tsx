import { Hooks, Row } from 'react-table'
import React from 'react'
import { CardType } from '../../../../API/types'
import { CardsTableActionButtons } from '../CardsTableActionButtons/CardsTableActionButtons'

export const cardsTableActionsCreator =
  (userID: string, isOwnUser: boolean) => (hooks: Hooks) => {
    if (!isOwnUser) {
      return hooks.visibleColumns
    }
    return hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Actions',
        Cell: ({ row }: { row: Row }) => {
          const typedRow = row.original as CardType
          const isOwnUser = typedRow.user_id === userID
          if (!isOwnUser) {
            return null
          }
          return (
            <CardsTableActionButtons
              cardId={typedRow._id}
              packId={typedRow.cardsPack_id}
              question={typedRow.question}
              answer={typedRow.answer}
            />
          )
        },
      },
    ])
  }
