import React from 'react'
import { Typography } from '@mui/material'
import { cardsCheer } from '../services/cardsСheer'

export const CardsCheer = ({ cardsCount }: { cardsCount: number }) => {
  const cards = cardsCheer(cardsCount)
  return (
    <Typography
      sx={{
        marginTop: '24px',
      }}
      component={'p'}
    >
      {cards}
    </Typography>
  )
}
