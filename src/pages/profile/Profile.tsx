import React, { useContext, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Box, Card, Grid, Typography } from '@mui/material'
import s from './profile.module.css'
import { logout } from '../../features/auth/login/BLL/loginThunks'
import { UpdateProfileContainer } from '../../features/auth/profile/UI/updateProfileContainer'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { CardsCheer } from '../../features/auth/profile/UI/CardsCheer'
import { HeaderContext } from '../../context/context'
import { profileSelector } from '../../features/auth/common/selectors/selectorsAuth'
import { updateProfile } from '../../features/auth/profile/BLL/profileThunk'
import { EditNameUser } from '../../common/EditNameUser/EditNameUser'
import XButton from '../../common/Button/XButton'
import { goBackButtonTitles } from '../../layout/Header/Header'

export const Profile = () => {
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  const { user } = useAppSelector(profileSelector)
  const dispatch = useAppDispatch()
  useSetHeaderTitle('Profile')

  const logoutHandler = () => dispatch(logout())

  useEffect(() => {
    setGoBackButtonTitle(goBackButtonTitles.toPacks)
    return () => setGoBackButtonTitle(goBackButtonTitles.none)
  }, [])

  const onOpenChange = (name: string) => dispatch(updateProfile({ name }))

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
        <XButton style={{ marginTop: '22px' }} onClick={logoutHandler}>
          Log out
        </XButton>
        <CardsCheer cardsCount={user.publicCardPacksCount} />
      </Card>
    </Grid>
  )
}
