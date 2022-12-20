import { Hooks, Row } from 'react-table'
import deleteIcon from './../../../../assets/icons/delete.svg'
import editIcon from './../../../../assets/icons/edit.svg'
import teachIcon from './../../../../assets/icons/teach.svg'
import React from 'react'

//Здесь мы добавляем кнопку к каждой строчке
//todo: сделать actions
export const tableHooksConstructor =
  (sendAction: (type: string, payload: string) => void) => (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Actions',
        Cell: ({ row }: { row: Row }) => (
          <>
            <button
              onClick={() => {
                sendAction('learn', row.values['_id'])
              }}
            >
              <img alt={'learn'} src={teachIcon} />
            </button>
            <button
              onClick={() => {
                sendAction('delete', row.values['_id'])
              }}
            >
              <img alt={'Delete'} src={deleteIcon} />
            </button>
            <button
              onClick={() => {
                sendAction('edit', row.values['_id'])
              }}
            >
              <img alt={'Edit'} src={editIcon} />
            </button>
          </>
        ),
      },
    ])
  }
