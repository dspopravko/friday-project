import React from 'react'
import s from '../PacksTableControls.module.css'
import { Button, ButtonGroup } from '@mui/material'

type ButtonGroupPropsType = {
  title: string[]
  activeButton: 0 | 1 | 2
  handleButtonClick: (button: number) => void
}

export const XButtonGroup = ({
  activeButton,
  handleButtonClick,
  title,
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
    <ButtonGroup className={s.buttonGroup}>
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
