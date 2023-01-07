import React from 'react'
import { UserType } from '../../../API/types'
import { Avatar, Typography } from '@mui/material'
import s from './UserItem.module.css'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../data/paths'
import { packsActions } from '../../../../packs/BLL/packsSlice'
import { useAppDispatch } from '../../../../../state/store'

export const UserItem = ({
  _id,
  name,
  publicCardPacksCount,
  avatar,
}: UserType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userClickHandler = () => {
    dispatch(packsActions.resetState())
    navigate(`/${PATH.USER}/${_id}`)
  }
  return (
    <div className={s.userContainer} onClick={userClickHandler}>
      <div style={{ marginLeft: '4px' }}>
        <Avatar sx={{ width: 76, height: 76 }} src={avatar} />
      </div>
      {name && (
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
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
