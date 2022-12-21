import React from 'react'
import { Pagination, TextField } from '@mui/material'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import * as _ from 'lodash'

export const TablePagination = ({
  page,
  maxPage,
}: {
  page: number
  maxPage: number
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const handleChange = (value: number) =>
    setSearchParams(createSearchParams({ ...params, page: value.toString() }))
  const debouncedChange = _.debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      handleChange(+e.target.value)
    },
    500
  )

  return (
    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
      <Pagination
        page={page === undefined ? 1 : page}
        count={maxPage === undefined ? 1 : maxPage}
        onChange={(event, page) => handleChange(page)}
      />
      <TextField
        onChange={(e) => debouncedChange(e)}
        type={'number'}
        sx={{
          width: 64,
        }}
        InputProps={{
          inputProps: {
            style: { padding: 5 },
          },
        }}
        size={'small'}
      />
    </div>
  )
}
