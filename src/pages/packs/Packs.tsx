import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { PacksTableControls } from '../../features/cards/packs/VIEW/Controls/PacksTableControls'
import { PacksTable } from '../../features/cards/packs/VIEW/Table/PacksTable'
import { getPacks } from '../../features/cards/packs/BLL/packsThunk'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { useSearchParams } from 'react-router-dom'
import { TablePagination } from '../../features/cards/common/TablePagination'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/packs/BLL/selectorsPacks'

export const Packs = () => {
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])
  return (
    <div style={{ marginTop: 40 }}>
      <Typography>Packs</Typography>
      <div>
        <PacksTableControls />
        <PacksTable />
        <TablePagination page={currentPage} maxPage={maxPage} />
      </div>
    </div>
  )
}
