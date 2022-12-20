import { Hooks, Row } from 'react-table'
import teachicon from '../../../../../assets/icons/teach.svg'
import editicon from '../../../../../assets/icons/edit.svg'
import deleteicon from '../../../../../assets/icons/delete.svg'
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
              <img alt={'learn'} src={teachicon} />
            </button>
            <button
              onClick={() => {
                sendAction('delete', row.values['_id'])
              }}
            >
              <img alt={'Delete'} src={deleteicon} />
            </button>
            <button
              onClick={() => {
                sendAction('edit', row.values['_id'])
              }}
            >
              <img alt={'Edit'} src={editicon} />
            </button>
          </>
        ),
      },
    ])
  }
