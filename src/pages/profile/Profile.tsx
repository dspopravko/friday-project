import React from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Box, Card, Grid, Typography } from '@mui/material'
import s from './profile.module.css'
import XButton from '../../common/components/button/XButton'
import { EditNameUser } from '../../common/components/editNameUser/EditNameUser'
import { logout } from '../../features/auth/login/services/loginThunks'
import { ProfilePhoto } from '../../features/auth/profile/profilePhoto'
import { setTitle } from '../../services/setHeaderTitle'
import { cardsCheer } from '../../features/auth/profile/services/cardsСheer'

export const Profile = () => {
  const dispatch = useAppDispatch()
  setTitle('Profile')
  const auth = useAppSelector((state) => state.auth)

  const logoutHandler = () => {
    dispatch(logout())
  }

  const onOpenChange = (name: string) => {
    alert(
      name +
        ', к сожалению бэк просит ещё и пароль, так что обновление только через формочку выше!'
    )
  }
  const cards = cardsCheer(auth.user.publicCardPacksCount)

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Card className={s.profileContainer}>
        <Typography className={s.title} variant={'h5'}>
          Personal Information
        </Typography>
        <ProfilePhoto />
        <Box className={s.name}>
          <EditNameUser value={auth.user.name} onChange={onOpenChange} />
        </Box>
        <Typography className={s.email} component={'p'}>
          {auth.user.email}
        </Typography>
        <div style={{ margin: '20px' }}>
          <XButton onClick={logoutHandler}>Log out</XButton>
        </div>
        <Typography
          sx={{
            marginTop: '24px',
          }}
          component={'p'}
        >
          {cards}
        </Typography>
      </Card>
    </Grid>
  )
}
