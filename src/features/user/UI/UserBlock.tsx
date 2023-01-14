import React, { useCallback, useEffect } from 'react'
import { Avatar, CircularProgress, Paper, Typography } from '@mui/material'
import s from './UserBlock.module.css'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import { getUser } from '../BLL/userThunk'
import { userSelector } from '../BLL/selectorUser'
import { createDate } from '../../../services/formatDateToString'
import { userActions } from '../BLL/userSlice'

export const UserBlock = ({ id }: { id: string }) => {
  const user = useAppSelector(userSelector)
  const dispatch = useAppDispatch()

  //state managing
  const stateManager = useCallback(() => {
    !user.created &&
      setTimeout(() => {
        dispatch(getUser({ id }))
      }, 1500)
    return () => {
      dispatch(userActions.resetState())
    }
  }, [])

  useEffect(() => {
    const resetState = stateManager()
    return () => {
      resetState()
    }
  }, [])

  return (
    <Paper className={s.userContainer}>
      <div className={s.avatarContainer}>
        <Avatar sx={{ width: 160, height: 160 }} src={user.avatar} />
      </div>
      {!user.name && <CircularProgress sx={{ marginTop: '110px' }} />}
      {user.name && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={s.textContainer}>
            <Typography variant={'h6'}>{user.name}</Typography>
          </div>
          <div className={s.textContainer}>
            <Typography>Email: {user.email}</Typography>
          </div>
          <div className={s.textContainer}>
            <Typography title={'Private packs counts too!'}>
              Packs: {user.publicCardPacksCount}
            </Typography>
          </div>
          <div className={s.textContainer}>
            <Typography>Created: {createDate(user.created)}</Typography>
          </div>
          <div className={s.textContainer}>
            <Typography>Last seen: {createDate(user.updated)}</Typography>
          </div>
        </div>
      )}
    </Paper>
  )
}
