import { Hooks, Row } from 'react-table'
import XButton from '../../../../../common/components/button/XButton'
import teachicon from '../../../../../assets/icons/teach.svg'
import editicon from '../../../../../assets/icons/edit.svg'
import deleteicon from '../../../../../assets/icons/delete.svg'
import React from 'react'
import { useAppDispatch } from '../../../../../state/store'
import { deletePack } from '../../BLL/packsThunk'
import s from './PacksTableActions.module.css'

//Здесь мы добавляем кнопку к каждой строчке
//todo: сделать actions
export const tableHooks = (hooks: Hooks) => {
  const dispatch = useAppDispatch()

  const deleteClickHandler = (data: string) => {
    console.log(data)

    dispatch(deletePack(data))
  }

  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: 'Edit',
      Header: 'Actions',
      Cell: ({ row }: { row: Row }) => (
        <>
          <button
            onClick={() =>
              alert('Current pack ID: ' + JSON.stringify(row.values['_id']))
            }
          >
            <img src={teachicon} />
          </button>
          <button onClick={() => deleteClickHandler(row.values['_id'])}>
            <img src={deleteicon} />
          </button>
          <button
            onClick={() =>
              alert('Current pack ID: ' + JSON.stringify(row.values['_id']))
            }
          >
            <img src={editicon} />
          </button>
        </>
      ),
    },
  ])
}
