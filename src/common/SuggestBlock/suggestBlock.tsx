import React from 'react'
import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { theme } from '../../assets/mui-theme'

type SuggestPropsType = {
  question: string
  suggestion: string
  path: string
}
export const SuggestBlock = ({
  suggestion,
  question,
  path,
}: SuggestPropsType) => {
  return (
    <>
      <Typography textAlign={'center'}>{question}</Typography>
      <NavLink
        replace
        to={path}
        style={{
          textDecoration: 'underline',
          color: theme.palette.primary.light,
          marginBottom: '20px',
        }}
      >
        <Typography
          variant={'h6'}
          textAlign={'center'}
          sx={{
            '&:hover': {
              fontWeight: '600',
            },
          }}
        >
          {suggestion}
        </Typography>
      </NavLink>
    </>
  )
}
