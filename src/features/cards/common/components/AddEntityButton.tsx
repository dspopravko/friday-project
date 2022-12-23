import React from 'react'
import { Button, Typography } from '@mui/material'

type AddEntityButtonPropsType = {
  title: string
  ButtonTitle: string
  ButtonCallback: () => void
}

export const AddEntityButton = ({
  ButtonCallback,
  ButtonTitle,
  title,
}: AddEntityButtonPropsType) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        margin: '0 auto',
      }}
    >
      <Typography variant={'h5'}>{title}</Typography>
      <Button onClick={ButtonCallback}>{ButtonTitle}</Button>
    </div>
  )
}
