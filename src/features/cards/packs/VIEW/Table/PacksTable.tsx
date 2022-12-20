import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { shapeTableHead } from './PacksTableHead'
import { tableHooksConstructor } from './PacksTableActions'
import { packResponseType } from '../../API/packsAPI'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { PATH } from '../../../../../data/paths'
import s from './../../../common/Table.module.css'
import { deletePack } from '../../BLL/packsThunk'

export function PacksTable() {
  const packs = useAppSelector((state) => state.packs.packsCurrent)
  const pending = useAppSelector((state) => state.packs.pending)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const updateParams = (newParams: { [param: string]: string }) => {
    setSearchParams(createSearchParams({ ...params, ...newParams }))
  }

  const productsData = useMemo(() => [...(packs as Array<any>)], [packs])
  const productsColumns = useMemo(() => {
    return shapeTableHead(packs, updateParams, params)
  }, [packs])

  const tableRowAction = (type: string, packID: string) => {
    switch (type) {
      case 'delete':
        dispatch(deletePack({ packID, params }))
        break
      case 'edit':
        break
      case 'learn':
        break
    }
  }

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    tableHooksConstructor(tableRowAction)
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  const cellClickHandler = (cell: unknown, row: unknown) => {
    const typedRow = row as { original: packResponseType }
    const typedCell = cell as { column: { id: string } }
    if (typedCell.column.id === 'user_name') {
      updateParams({ user_id: typedRow.original.user_id })
      return
    }
    if (typedCell.column.id !== 'Edit') {
      navigate(`/${PATH.CARDS}/${typedRow.original._id}`)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        overflowX: 'auto',
        opacity: pending ? '0.4' : '1',
      }}
    >
      <table className={s.table} {...getTableProps()}>
        <thead className={s.tableHead}>
          {headerGroups.map((headerGroup) => {
            const { key, ...restProps } = headerGroup.getHeaderGroupProps()
            return (
              <tr className={s.tableRow} key={key} {...restProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restProps } = column.getHeaderProps()
                  return (
                    <th className={s.tableCell} key={key} {...restProps}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody className={s.tableBody} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            const { key, ...restProps } = row.getRowProps()
            return (
              <tr
                className={s.tableRow}
                // onClick={() => openCardsHandler(row)}
                key={key}
                {...restProps}
              >
                {row.cells.map((cell) => {
                  const { key, ...restProps } = cell.getCellProps()
                  return (
                    <td
                      title={
                        cell.column.id === 'user_name'
                          ? 'Show this user packs'
                          : ''
                      }
                      onClick={() => cellClickHandler(cell, row)}
                      className={s.tableCell}
                      key={key}
                      {...restProps}
                    >
                      <>{cell.render('Cell')}</>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
