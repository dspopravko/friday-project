import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../context/context'
import { setPageTitle } from '../../services/pageTitle'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Box, Card, Grid, Typography } from '@mui/material'
import styles from './profile.module.css'
import XButton from '../../common/components/button/XButton'
import { EditNameUser } from '../../common/components/editNameUser/EditNameUser'
import { logout } from '../../features/auth/authThunks'
import { ProfilePhoto } from './updateProfile'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { setTitle } = useContext(HeaderTitleContext)
  const user = useAppSelector((state) => state.auth.user)
  useEffect(() => {
    setTitle('Profile')
    setPageTitle('Profile')
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
  }

  const onOpenChange = () => {
    console.log('dsdsd') // заглушка для prettera нужно за диспачить новое имя в state
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Card className={styles.pageContainer}>
        <Typography className={styles.title} variant={'h5'}>
          Personal Information
        </Typography>
        <ProfilePhoto />
        <Box className={styles.name}>
          <EditNameUser value={user.name} onChange={onOpenChange} />
        </Box>
        <Typography className={styles.email} component={'p'}>
          {user.email}
        </Typography>
        <XButton onClick={logoutHandler}>Log out</XButton>
      </Card>
    </Grid>
  )
}
