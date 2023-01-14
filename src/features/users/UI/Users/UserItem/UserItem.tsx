import React from 'react'
import { UserType } from '../../../API/types'
import { Avatar, Typography } from '@mui/material'
import s from './UserItem.module.css'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../data/paths'
import { useAppDispatch } from '../../../../../state/store'
import { userActions } from '../../../../user/BLL/userSlice'

export const UserItem = (user: UserType) => {
  const navigate = useNavigate()
  const dispacth = useAppDispatch()

  const userClickHandler = () => {
    dispacth(userActions.setUserProperty(user))
    user._id && navigate(`/${PATH.USER}/${user._id}`)
  }

  return (
    <div className={s.userContainer} onClick={userClickHandler}>
      <div style={{ marginLeft: '4px' }}>
        <Avatar sx={{ width: 76, height: 76 }} src={user.avatar} />
      </div>
      {user.name && (
        <div className={s.textContainer}>
          <div>
            <Typography>{user.name}</Typography>
          </div>
          <div>
            <Typography>Packs: {user.publicCardPacksCount}</Typography>
          </div>
        </div>
      )}
    </div>
  )
}
