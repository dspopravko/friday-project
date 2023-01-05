import React, { useEffect } from 'react'
import { Paper } from '@mui/material'
import { PacksTable } from '../../packs/UI/Table/PacksTable/PacksTable'
import { TablePagination } from '../../../common/TablePagination/TablePagination'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../packs/BLL/selectorsPacks'
import { useSearchParams } from 'react-router-dom'
import { getPacks } from '../../packs/BLL/packsThunk'

export const UserPacksTable = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  useEffect(() => {
    dispatch(getPacks({ ...params, user_id: id }))
  }, [searchParams])

  return (
    <Paper style={{ width: 800 }}>
      <PacksTable
        columnPropsNames={['deckCover', 'name', 'cardsCount', 'updated', '_id']}
      />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        title={'packs'}
      />
    </Paper>
  )
}
