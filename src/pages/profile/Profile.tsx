import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../context/context'
import { setPageTitle } from '../../services/pageTitle'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Box, Card, Grid, Typography } from '@mui/material'
import styles from './profile.module.css'
import XButton from '../../common/components/button/XButton'
import { EditNameUser } from '../../common/components/editNameUser/EditNameUser'
import { logout } from '../../features/auth/authThunks'
import { ProfilePhoto } from '../../features/auth/components/profile/profilePhoto'
import { Navigate } from 'react-router-dom'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { setTitle } = useContext(HeaderTitleContext)
  const auth = useAppSelector((state) => state.auth)
  if (!auth.isAuth) {
    return <Navigate to={'/login'} />
  }
  useEffect(() => {
    setTitle('Profile')
    setPageTitle('Profile')
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
  }

  const onOpenChange = (name: string) => {
    alert(
      name +
        ', к сожалению бэк просит ещё и пароль, так что обновление только через формочку выше!'
    )
  }
  const cards =
    auth.user.publicCardPacksCount > 10
      ? `You have a ${auth.user.publicCardPacksCount} cards! Continue in the same spirit`
      : `You have ${auth.user.publicCardPacksCount} cards.`

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Card className={styles.pageContainer}>
        <Typography className={styles.title} variant={'h5'}>
          Personal Information
        </Typography>
        <ProfilePhoto />{' '}
        {/*здесь лежит блок с аватаркой и кнопкой которая вызывает форму обновления профиля*/}
        <Box className={styles.name}>
          <EditNameUser value={auth.user.name} onChange={onOpenChange} />
        </Box>
        <Typography className={styles.email} component={'p'}>
          {auth.user.email}
        </Typography>
        <XButton onClick={logoutHandler}>Log out</XButton>
        <Typography component={'p'}>{cards}</Typography>
      </Card>
    </Grid>
  )
}
