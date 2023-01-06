import React from 'react'
import { UserType } from '../../../API/types'
import { Avatar, CircularProgress, Typography } from '@mui/material'
import s from './UserItem.module.css'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../data/paths'
import { useAppSelector } from '../../../../../state/store'
import { userPendingSelector } from '../../../../user/BLL/selectorUser'

export const UserItem = ({
  _id,
  name,
  publicCardPacksCount,
  avatar,
}: UserType) => {
  const pending = useAppSelector(userPendingSelector)
  const navigate = useNavigate()
  const userClickHandler = () => {
    navigate(`/${PATH.USER}/${_id}`)
  }
  return (
    <div className={s.userContainer} onClick={userClickHandler}>
      <div style={{ marginLeft: '4px' }}>
        <Avatar sx={{ width: 76, height: 76 }} src={avatar} />
      </div>
      {pending && <CircularProgress sx={{ marginLeft: '54px' }} />}
      {name && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={s.textContainer}>
            <Typography>{name}</Typography>
          </div>
          <div className={s.textContainer}>
            <Typography>Packs: {publicCardPacksCount}</Typography>
          </div>
        </div>
      )}
    </div>
  )
}
