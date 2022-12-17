import { Hooks, Row } from 'react-table'
import XButton from '../../../../../common/components/button/XButton'
import React from 'react'

//Здесь мы добавляем кнопку к каждой строчке
//todo: сделать actions
export const tableHooks = (hooks: Hooks) => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: 'Edit',
      Header: 'Actions',
      Cell: ({ row }: { row: Row }) => (
        <XButton
          onClick={() =>
            alert('Current pack ID: ' + JSON.stringify(row.values['_id']))
          }
        >
          Edit
        </XButton>
      ),
    },
  ])
}
