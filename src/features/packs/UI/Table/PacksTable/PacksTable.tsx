import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { PacksTableColumnsRender } from '../PacksTableColumnsRender/PacksTableColumnsRender'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { PATH } from '../../../../../data/paths'
import s from '../../../../../assets/styles/Table.module.css'
import { userIdSelector } from '../../../../../state/selectors'
import { rememberPack } from '../../../../cards/BLL/cardsSlice'
import { PackType } from '../../../API/types'
import { pendingPacks, packsSelector } from '../../../BLL/selectorsPacks'
import { packsTableActionsCreator } from '../PacksTableActions/PacksTableActionsCreator/PacksTableActionsCreator'
import { Typography } from '@mui/material'
import cx from 'classnames'
import { userActions } from '../../../../user/BLL/userSlice'

type PacksTablePropsType = {
  columnsPropsNames: Array<keyof PackType>
}
export const PacksTable = ({ columnsPropsNames }: PacksTablePropsType) => {
  const packs = useAppSelector(packsSelector)
  const pending = useAppSelector(pendingPacks)
  const userID = useAppSelector(userIdSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  //query params
  const updateParams = (newParams: { [param: string]: string }) => {
    setSearchParams(
      createSearchParams({ ...params, ...newParams, page: '1' }),
      { replace: true }
    )
  }

  //react-tables
  const productsData = useMemo(() => [...(packs as never[])], [packs])
  const productsColumns = useMemo(() => {
    return PacksTableColumnsRender(
      packs,
      updateParams,
      params,
      columnsPropsNames
    )
  }, [packs])

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    packsTableActionsCreator(userID)
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  //handlers
  const cellClickHandler = (cell: unknown, row: unknown) => {
    const typedRow = row as { original: PackType }
    const typedCell = cell as { column: { id: string } }
    if (typedCell.column.id === 'user_name') {
      dispatch(
        userActions.setUserProperty({ name: typedRow.original.user_name })
      )
      navigate(`/${PATH.USER}/${typedRow.original.user_id}`)
      return
    }
    if (typedCell.column.id !== 'Actions') {
      dispatch(rememberPack({ ...typedRow.original }))
      navigate(`/${PATH.CARDS}/${typedRow.original._id}`)
    }
  }

  return (
    <>
      <div className={cx({ [s.tableContainer]: true, pending: pending })}>
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
        {!packs[0] && !pending && (
          <Typography sx={{ m: 14 }} variant={'h5'}>
            No packs found!
          </Typography>
        )}
      </div>
    </>
  )
}
