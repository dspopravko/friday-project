import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { shapeTableHead } from './CardsTableHead'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../../../state/store'
import { selectCards } from '../BLL/selectorsCards'
import s from './../../common/Table.module.css'
import { CircularProgress, Typography } from '@mui/material'
import { userIdSelector } from '../../../../state/selectors'
import { tableActionsConstructor } from '../../common/TableActionsConstructor'

export function CardsTable() {
  const cards = useAppSelector(selectCards)
  const pending = useAppSelector((state) => state.cards.pending)
  const userID = useAppSelector(userIdSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (newParams: { [param: string]: string }) => {
    setSearchParams(createSearchParams({ ...params, ...newParams }))
  }

  const productsData = useMemo(() => [...(cards as Array<any>)], [cards])
  const productsColumns = useMemo(() => {
    return shapeTableHead(cards, updateParams, params)
  }, [cards])

  const tableRowAction = (type: string, packID: string) => {
    switch (type) {
      case 'delete':
        // dispatch(deleteCard({ packID, params }))
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
    tableActionsConstructor(tableRowAction, userID, true)
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        overflowX: 'auto',
        opacity: pending ? '0.4' : '1',
      }}
    >
      {cards[0] ? (
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
                <tr className={s.tableRow} key={key} {...restProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restProps } = cell.getCellProps()
                    return (
                      <td className={s.tableCell} key={key} {...restProps}>
                        <>{cell.render('Cell')}</>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div
          style={{
            width: '200px',
            height: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {(() => {
            if (pending) {
              return <CircularProgress />
            } else {
              return (
                <Typography>
                  We didn&apos;t find any cards, try softening your search terms
                </Typography>
              )
            }
          })()}
        </div>
      )}
    </div>
  )
}
