import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { CardsTableColumnsRender } from '../CardsTableColumnsRender/CardsTableColumnsRender'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../../../../state/store'
import { pendingCards, selectCards } from '../../../BLL/selectorsCards'
import s from '../../../../../assets/styles/Table.module.css'
import { CircularProgress, Typography } from '@mui/material'
import { userIdSelector } from '../../../../../state/selectors'
import { cardsTableActionsCreator } from '../CardsTableActions/CardsTableActionsCreator/CardsTableActionsCreator'
import { CardType } from '../../../API/types'
import cx from 'classnames'

type CardsTablePropsType = {
  columnsPropsNames: Array<keyof CardType>
}

export const CardsTable = ({ columnsPropsNames }: CardsTablePropsType) => {
  const cards = useAppSelector(selectCards)
  const pending = useAppSelector(pendingCards)
  const userID = useAppSelector(userIdSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  //query params
  const updateParams = (newParams: { [param: string]: string }) =>
    setSearchParams(createSearchParams({ ...params, ...newParams }), {
      replace: true,
    })

  //react-tables
  const productsData = useMemo(() => [...(cards as Array<never>)], [cards])
  const productsColumns = useMemo(() => {
    return CardsTableColumnsRender(
      cards,
      updateParams,
      params,
      columnsPropsNames
    )
  }, [cards])

  const isOwnUser = cards[0] && cards[0].user_id === userID

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
    <div className={cx({ [s.tableContainer]: true, pending: pending })}>
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
        <div className={s.progressContainer}>
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
