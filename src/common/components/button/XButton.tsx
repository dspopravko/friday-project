import React from 'react'
import { Button } from '@mui/material'
import { theme } from '../../../assets/mui-theme'
import { ExtendButtonBase } from '@mui/material/ButtonBase'
import { ButtonTypeMap } from '@mui/material/Button/Button'

//всю типизацию надо рефакторить и делать нормально, с передачей event
type DefaultButtonPropsType = ExtendButtonBase<ButtonTypeMap>

type XButtonPropsType = Omit<DefaultButtonPropsType, 'type'> & {
  type?: 'primary' | 'secondary' | 'delete'
  disabled?: boolean
  children?: React.ReactNode
  onClick?: () => void
  onBlur?: () => void
  ClassName?: string
}

const SuperButton: React.FC<XButtonPropsType> = ({
  type,
  disabled,
  ClassName,
  ...rest
}) => {
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

export default SuperButton
