import React from 'react'
import { Button, Typography } from '@mui/material'
import s from './HeaderButtonWithTitle.module.css'

type AddEntityButtonPropsType = {
  title: string
  buttonTitle: string
  buttonCallback: () => void
  children?: React.ReactNode
}

export const HeaderButtonWithTitle = ({
  buttonCallback,
  buttonTitle,
  title,
  children,
}: AddEntityButtonPropsType) => {
  return (
    <div className={s.mainContainer}>
      <div className={s.titleContainer}>
        <Typography variant={'h5'}>{title}</Typography>
        {children}
      </div>
      <Button onClick={buttonCallback}>{buttonTitle}</Button>
    </div>
  )
}
