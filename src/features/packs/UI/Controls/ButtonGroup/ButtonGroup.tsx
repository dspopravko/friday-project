import React from 'react'
import { Button, ButtonGroup } from '@mui/material'

type ButtonGroupPropsType = {
  title: string[]
  activeButton: 0 | 1 | 2
  handleButtonClick: (button: number) => void
}

/**
 * One of the two buttons can be selected, or none
 */

export const XButtonGroup = ({
  title,
  activeButton,
  handleButtonClick,
}: ButtonGroupPropsType) => {
  const buttonStyle = {
    width: '87px',
    boxShadow: 1,
    '&.MuiButton-outlinedSecondary:hover': {
      boxShadow: 1,
    },
    '&.MuiButton-outlinedPrimary:hover': {
      boxShadow: 1,
    },
  }
  return (
    <ButtonGroup>
      <Button
        sx={buttonStyle}
        color={activeButton === 1 ? 'primary' : 'secondary'}
        onClick={() => {
          handleButtonClick(1)
        }}
      >
        {title[0]}
      </Button>
      <Button
        sx={buttonStyle}
        color={activeButton === 2 ? 'primary' : 'secondary'}
        onClick={() => {
          handleButtonClick(2)
        }}
      >
        {title[1]}
      </Button>
    </ButtonGroup>
  )
}
