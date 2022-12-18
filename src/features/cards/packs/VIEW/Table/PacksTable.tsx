import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { useAppSelector } from '../../../../../state/store'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { shapeTableHead } from './PacksTableHead'
import { tableHooks } from './PacksTableActions'
import { packResponseType } from '../../API/packsAPI'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../data/paths'

export function PacksTable() {
  const { packs } = useAppSelector((state) => state.packs)
  const navigate = useNavigate()
  //использовать мемо - обязательное условие в документации к react-table
  const productsData = useMemo(() => [...(packs as Array<any>)], [packs])
  const productsColumns = useMemo(() => {
    return shapeTableHead(packs)
  }, [packs])

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    tableHooks
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  const isEven = (idx: number) => idx % 2 === 0

  const openCardsHandler = (props: unknown) => {
    const typedRow = props as { original: packResponseType }
    navigate(`/${PATH.CARDS}/${typedRow.original._id}`)
  }
  return (
    <div style={{ maxWidth: '60vw', overflowX: 'auto' }}>
      <Table {...getTableProps()}>
        <TableHead
          style={{
            background: '#EFEFEF',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {headerGroups.map((headerGroup) => {
            const { key, ...restProps } = headerGroup.getHeaderGroupProps()
            return (
              <TableRow key={key} {...restProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restProps } = column.getHeaderProps()
                  return (
                    <th key={key} {...restProps}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)
            const { key, ...restProps } = row.getRowProps()
            return (
              <TableRow
                onClick={() => openCardsHandler(row)}
                key={key}
                {...restProps}
                style={{ background: isEven(idx) ? '#eaf3ee' : '' }}
              >
                {row.cells.map((cell) => {
                  const { key, ...restProps } = cell.getCellProps()
                  return (
                    <TableCell key={key} {...restProps}>
                      <>{cell.render('Cell')}</>
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
