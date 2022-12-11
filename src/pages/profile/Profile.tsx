import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../context/context'
import { setPageTitle } from '../../services/pageTitle'
import { useAppDispatch, useAppSelector } from '../../state/store'
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import s from './profile.module.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import XButton from '../../common/components/button/XButton'
import { logout } from '../../features/auth/authSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { setTitle } = useContext(HeaderTitleContext)
  const user = useAppSelector((state) => state.auth.user)
  useEffect(() => {
    setTitle('Profile')
    setPageTitle('Profile')
  }, [])

  const logoutHandler = () => {
    dispatch(logout)
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Paper className={s.pageContainer}>
        <Typography className={s.title} variant={'h5'}>
          Personal Information
        </Typography>
        <Badge
          badgeContent={
            <IconButton>
              <CameraAltIcon />
            </IconButton>
          }
          showZero
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar
            alt={'Foto user'}
            src={user.avatar}
            sx={{ width: 96, height: 96 }}
          />
        </Badge>
        <Typography className={s.name} component={'p'}>
          {user.name}
        </Typography>
        <Typography className={s.email} component={'p'}>
          {user.email}
        </Typography>
        <XButton className={s.btn} onClick={logoutHandler}>
          Log out
        </XButton>
      </Paper>
    </Grid>
  )
}
