import React, { useMemo } from 'react'
import { Hooks, Row, useTable } from 'react-table'
import { useAppSelector } from '../../../../state/store'

export function PacksTable() {
  const { packs } = useAppSelector((state) => state.packs)
  //использовать мемо - обязательное условие в документации к react-table
  const productsData = useMemo(() => [...(packs as Array<any>)], [packs])
  const productsColumns = useMemo(() => {
    //оформляем наши данные в колонки для react-tables, библиотека требует данные в виде массива объектов {Header: '', accessor: ''}
    //todo: написать решейпер для объекта, и вынести в отдельный файл
    const reshapedObj = packs.map((obj) => ({
      ...{ deckCover: 'url' }, // добавляем заглушку, если изображение не пришло
      ...obj,
    }))
    return reshapedObj[0]
      ? Object.keys(reshapedObj[0])
          .filter(
            (
              key ///убираем лишние поля из объекта
            ) =>
              [
                'name',
                '_id',
                'user_name',
                'cardsCount',
                'updated',
                'rating',
                'deckCover',
              ].includes(key)
          )
          .map((key) => {
            ////переназначаем дефолтный метод рендера из react-table, чтобы отрисовывалась картинка, а не ссылка
            if (key === 'deckCover') {
              return {
                Header: 'Image',
                accessor: key,
                Cell: ({ value }: { value: string }) => (
                  <img
                    alt={'pack_cover'}
                    style={{ width: '50px', height: '50px' }}
                    src={value}
                  />
                ),
                maxWidth: 70,
              }
            }
            //убираем рендер id шки, чтобы её данные по прежнему были в таблице, но не рисовались
            if (key === '_id') {
              return {
                Header: '',
                accessor: key,
                Cell: () => null,
              }
            }
            return { Header: key, accessor: key }
          })
      : []
  }, [packs])

  ///Здесь мы добавляем кнопку к каждой сторчке
  const tableHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Actions',
        Cell: ({ row }: { row: Row }) => (
          <button
            onClick={() =>
              alert('Current pack ID: ' + JSON.stringify(row.values['_id']))
            }
          >
            Edit
          </button>
        ),
      },
    ])
  }

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    tableHooks
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    // state,
  } = tableInstance

  const isEven = (idx: number) => idx % 2 === 0

  return (
    <div style={{ maxWidth: '60vw', overflowX: 'auto' }}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restProps } = headerGroup.getHeaderGroupProps()
            return (
              <tr key={key} {...restProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restProps } = column.getHeaderProps()
                  return (
                    <th key={key} {...restProps}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)
            const { key, ...restProps } = row.getRowProps()
            return (
              <tr
                key={key}
                {...restProps}
                style={{ background: isEven(idx) ? 'green' : '' }}
              >
                {row.cells.map((cell) => {
                  const { key, ...restProps } = cell.getCellProps()
                  return (
                    <td key={key} {...restProps}>
                      {cell.render('Cell')}
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
