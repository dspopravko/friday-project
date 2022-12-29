import React, { useContext, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Box, Card, Grid, Typography } from '@mui/material'
import s from './profile.module.css'
import XButton from '../../common/components/button/XButton'
import { EditNameUser } from '../../common/components/editNameUser/EditNameUser'
import { logout } from '../../features/auth/login/services/loginThunks'
import { UpdateProfileContainer } from '../../features/auth/profile/updateProfileContainer'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { profileSlice } from '../../features/auth/profile/services/profileSlice'
import { CardsCheer } from '../../features/auth/profile/CardsCheer'
import { HeaderContext } from '../../context/context'
import { profileSelector } from '../../features/auth/selectorsAuth'
import { updateProfile } from '../../features/auth/profile/services/profileThunk'

export const Profile = () => {
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  const { user, updateSuccess } = useAppSelector(profileSelector)
  const dispatch = useAppDispatch()
  useSetHeaderTitle('Profile')
  setResetTimeout(4000, updateSuccess)
  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    setGoBackButtonTitle('Go back')
    return () => setGoBackButtonTitle('')
  }, [])

  const onOpenChange = (name: string) => {
    dispatch(updateProfile({ name }))
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Card className={s.profileContainer}>
        <Typography className={s.title} variant={'h5'}>
          Personal Information
        </Typography>
        <UpdateProfileContainer photo={user.avatar} />
        <Box className={s.name}>
          <EditNameUser value={user.name} onChange={onOpenChange} />
        </Box>
        <Typography className={s.email} component={'p'}>
          {user.email}
        </Typography>
        <XButton style={{ marginTop: '30px' }} onClick={logoutHandler}>
          Log out
        </XButton>
        <CardsCheer cardsCount={user.publicCardPacksCount} />
      </Card>
    </Grid>
  )
}

//после обновления профиля меняется состояние updateSuccess, этот таймер сбрасывает это состояние
function setResetTimeout(delay: number, success: boolean) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timer = setTimeout(() => {
      if (success) {
        dispatch(profileSlice.actions.resetSuccess())
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [success])
}
