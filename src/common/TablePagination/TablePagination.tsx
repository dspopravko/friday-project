import React from 'react'
import { Pagination } from '@mui/material'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { XSelect } from './..'
import s from './TablePagination.module.css'

const pageCountOptions = [
  { id: 4, value: '4' },
  { id: 10, value: '10' },
  { id: 25, value: '25' },
]
type TablePaginationPropsType = {
  page: number
  maxPage: number
  pageCount: number
  initPageCount: number
  title?: string
}

export const TablePagination = ({
  page,
  maxPage,
  pageCount,
  initPageCount = 4,
  title = 'items',
}: TablePaginationPropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const handleChange = (value: number, param: string) =>
    setSearchParams(
      createSearchParams({ ...params, [param]: value.toString() }),
      { replace: true }
    )

  return (
    <div className={s.tablePaginationContainer}>
      <Pagination
        page={isNaN(page) ? 1 : page}
        count={isNaN(maxPage) ? 1 : maxPage}
        onChange={(event, page) => handleChange(page, 'page')}
      />
      Show
      <XSelect
        className={s.pageCountSelect}
        value={pageCount || initPageCount}
        onChangeOption={(option: number) =>
          handleChange(+pageCountOptions[option - 1].value, 'pageCount')
        }
        options={pageCountOptions}
      />
      &nbsp;
      {title} per page
    </div>
  )
}
