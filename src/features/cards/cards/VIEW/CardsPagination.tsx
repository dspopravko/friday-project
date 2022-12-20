import React from 'react'
import { Pagination } from '@mui/material'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { currentPageSelector, maxPageSelector } from '../BLL/selectorsCards'
import { useAppSelector } from '../../../../state/store'

export const CardsPagination = () => {
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) =>
    setSearchParams(createSearchParams({ ...params, page: value.toString() }))

  return (
    <div style={{ marginTop: '20px' }}>
      <Pagination
        page={currentPage === undefined ? 1 : currentPage}
        count={maxPage === undefined ? 1 : maxPage}
        onChange={handleChange}
      />
    </div>
  )
}
