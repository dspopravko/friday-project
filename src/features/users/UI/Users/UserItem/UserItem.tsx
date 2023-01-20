import React from 'react'
import { UserType } from '../../../API/types'
import { Avatar, Typography } from '@mui/material'
import s from './UserItem.module.css'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../data/paths'
import { useAppDispatch } from '../../../../../state/store'
import { userActions } from '../../../../user/BLL/userSlice'
import { motion } from 'framer-motion'

export const UserItem = ({
  user,
  index,
}: {
  user: UserType
  index: number
}) => {
  const navigate = useNavigate()
  const dispacth = useAppDispatch()

  const userClickHandler = () => {
    dispacth(userActions.setUserProperty(user))
    user._id && navigate(`/${PATH.USER}/${user._id}`)
  }

  return (
    <motion.div
      initial={{
        scale: 0.98,
        opacity: 0,
        y: -30,
      }}
      animate={{
        scale: 1,
        y: 0,
        opacity: 1,
        transition: { delay: index * 0.1, duration: 0.1 },
      }}
      exit={'exit'}
      className={s.userContainer}
      onClick={userClickHandler}
    >
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
    </motion.div>
  )
}
