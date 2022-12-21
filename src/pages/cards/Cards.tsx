import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards } from '../../features/cards/cards/BLL/cardsThunk'
import { Typography } from '@mui/material'
import { CardsTableControls } from '../../features/cards/cards/VIEW/CardsTableControls'
import { CardsTable } from '../../features/cards/cards/VIEW/CardsTable'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/cards/BLL/selectorsCards'
import { TablePagination } from '../../features/cards/common/TablePagination'

export const Cards = () => {
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useEffect(() => {
    id && dispatch(getCards({ cardsPack_id: id, ...params }))
  }, [id, params])

  return (
    <div style={{ marginTop: 40 }}>
      <Typography>Cards Card id: {id}</Typography>
      <div>
        <CardsTableControls />
        <CardsTable />
        <TablePagination page={currentPage} maxPage={maxPage} />
      </div>
    </div>
  )
}
