import React from 'react'
import { Pagination } from '@mui/material'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import XSelect from '../../../../common/components/selectors/select/XSelect'

const pageCountOptions = [
  { id: 4, value: '4' },
  { id: 10, value: '10' },
  { id: 25, value: '25' },
]
type TablePaginationPropsType = {
  page: number
  maxPage: number
  pageCount: number
  title?: string
}

export const TablePagination = ({
  page,
  maxPage,
  pageCount,
  title,
}: TablePaginationPropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const handleChange = (value: number, param: string) =>
    setSearchParams(
      createSearchParams({ ...params, [param]: value.toString() })
    )

  return (
    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
      <Pagination
        page={isNaN(page) ? 1 : page}
        count={isNaN(maxPage) ? 1 : maxPage}
        onChange={(event, page) => handleChange(page, 'page')}
      />
      Show
      <XSelect
        style={{ width: 50, margin: '0 10px 0 10px' }}
        value={pageCount || 1}
        onChangeOption={(option) =>
          handleChange(+pageCountOptions[option - 1].value, 'pageCount')
        }
        options={pageCountOptions}
      />{' '}
      {title} per page
    </div>
  )
}
