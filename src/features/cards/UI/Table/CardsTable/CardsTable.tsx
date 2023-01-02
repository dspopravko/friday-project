import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { CardsTableHead } from '../CardsTableHead/CardsTableHead'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../../../../state/store'
import { selectCards } from '../../../BLL/selectorsCards'
import s from '../../../../../assets/styles/Table.module.css'
import { CircularProgress, Typography } from '@mui/material'
import { userIdSelector } from '../../../../../state/selectors'
import { cardsTableActionsCreator } from '../CardsTableActions/CardsTableActionsCreator/CardsTableActionsCreator'

export function CardsTable() {
  const cards = useAppSelector(selectCards)
  const pending = useAppSelector((state) => state.cards.pending)
  const userID = useAppSelector(userIdSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (newParams: { [param: string]: string }) => {
    setSearchParams(createSearchParams({ ...params, ...newParams }))
  }

  const productsData = useMemo(() => [...(cards as Array<never>)], [cards])
  const productsColumns = useMemo(() => {
    return CardsTableHead(cards, updateParams, params)
  }, [cards])

  let isOwnUser
  if (cards[0]) {
    isOwnUser = cards[0].user_id === userID
  } else {
    isOwnUser = false
  }

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    cardsTableActionsCreator(userID, isOwnUser)
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
          {pending ? (
            <CircularProgress />
          ) : (
            <Typography>
              We didn&apos;t find any cards, try softening your search terms
            </Typography>
          )}
        </div>
      )}
    </div>
  )
}
