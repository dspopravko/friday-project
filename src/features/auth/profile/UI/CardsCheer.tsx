import React from 'react'
import { Typography } from '@mui/material'
import { cardsCheer } from '../services/cardsСheer'

export const CardsCheer = ({ packsCount }: { packsCount: number }) => {
  const cards = cardsCheer(packsCount)
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
