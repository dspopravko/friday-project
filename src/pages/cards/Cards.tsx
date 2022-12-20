import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../state/store'
import { getCards } from '../../features/cards/cards/BLL/cardsThunk'
import { Typography } from '@mui/material'
import { CardsTableControls } from '../../features/cards/cards/VIEW/CardsTableControls'
import { CardsTable } from '../../features/cards/cards/VIEW/CardsTable'
import { CardsPagination } from '../../features/cards/cards/VIEW/CardsPagination'

export const Cards = () => {
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
        <CardsPagination />
      </div>
    </div>
  )
}
