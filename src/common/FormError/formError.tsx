import React from 'react'
import { Typography } from '@mui/material'
import { theme } from '../../assets/mui-theme'

export const FormError = ({ error }: { error: string }) => {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        mt: '10px',
        color: theme.palette.error.dark,
      }}
    >
      {error}
    </Typography>
  )
}
