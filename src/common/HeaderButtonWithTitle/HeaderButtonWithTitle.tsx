import React from 'react'
import { Button, Typography } from '@mui/material'

type AddEntityButtonPropsType = {
  pending?: boolean
  title: string
  buttonTitle: string
  buttonCallback: () => void
  children?: React.ReactNode
}

export const HeaderButtonWithTitle = ({
  buttonCallback,
  buttonTitle,
  title,
  pending = false,
  children,
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant={'h5'} sx={{ opacity: pending ? '0.5' : 'none' }}>
          {title}
        </Typography>
        {children}
      </div>
      <Button disabled={pending} onClick={buttonCallback}>
        {buttonTitle}
      </Button>
    </div>
  )
}
