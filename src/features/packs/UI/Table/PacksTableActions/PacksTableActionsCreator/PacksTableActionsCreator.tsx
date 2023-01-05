import { Hooks, Row } from 'react-table'
import React from 'react'
import { PacksType } from '../../../../BLL/packsSlice'
import { PacksTableActionButtons } from '../PacksTableActionButtons/PacksTableActionButtons'

export const packsTableActionsCreator = (userID: string) => (hooks: Hooks) => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: 'Edit',
      Header: () => {
        return <p style={{ width: '70px' }}>Actions</p>
      },
      Cell: ({ row }: { row: Row }) => {
        const typedRow = row.original as PacksType
        return (
          <PacksTableActionButtons
            packId={typedRow._id}
            isEmpty={typedRow.cardsCount < 1}
            isOwnUser={typedRow.user_id === userID}
            packName={typedRow.name}
            packType={typedRow.private}
            cardName={typedRow.name}
          />
        )
      },
    },
  ])
}
