import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { theme } from '../../../assets/mui-theme'

type XButtonPropsType = Omit<ButtonProps, 'type'> & {
  type?: 'primary' | 'secondary' | 'delete'
  children?: React.ReactNode
}

const XButton: React.FC<XButtonPropsType> = ({ type, disabled, ...rest }) => {
  return (
    <Button
      {...rest}
      disabled={disabled}
      sx={{
        color: 'hsl(0,0%,100%)',
        ...(type === 'secondary' && {
          color: 'hsl(0,0%,3%)',
          backgroundColor: 'hsl(0,0%,100%)',
          '&:hover': {
            backgroundColor: 'hsl(0,0%,96%)',
          },
        }),
        ...(type === 'delete' && {
          backgroundColor: theme.palette.error.dark,
          '&:hover': {
            backgroundColor: theme.palette.error.light,
          },
        }),
      }}
    >
      {rest.children}
    </Button>
  )
}

export default XButton
