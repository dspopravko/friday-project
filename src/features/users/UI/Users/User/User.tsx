import React from 'react'
import { UserType } from '../../../API/types'
import { Avatar, Typography } from '@mui/material'
import s from './User.module.css'

export const User = ({ name, publicCardPacksCount, avatar }: UserType) => {
  return (
    <div className={s.userContainer}>
      <div style={{ marginLeft: '12px' }}>
        <Avatar sx={{ width: 76, height: 76 }} src={avatar} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={s.textContainer}>
          <Typography>{name}</Typography>
        </div>
        <div className={s.textContainer}>
          <Typography>Cards: {publicCardPacksCount}</Typography>
        </div>
      </div>
    </div>
  )
}
