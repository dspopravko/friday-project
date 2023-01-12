import React from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Box, Card, Typography } from '@mui/material'
import s from './Profile.module.css'
import { logout } from '../../features/auth/login/BLL/loginThunks'
import { UpdateProfileContainer } from '../../features/auth/profile/UI/updateProfileContainer'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { CardsCheer } from '../../features/auth/profile/UI/CardsCheer'
import { profileSelector } from '../../features/auth/common/selectors/selectorsAuth'
import { updateProfile } from '../../features/auth/profile/BLL/profileThunk'
import { EditNameUser, XButton } from '../../common'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'
import { motion } from 'framer-motion'

export const Profile = () => {
  const { user } = useAppSelector(profileSelector)
  const dispatch = useAppDispatch()
  useSetHeaderTitle('Profile')

  const logoutHandler = () => dispatch(logout())
  useGoBackButton(goBackButtonTitles.toPacks)

  const onOpenChange = (name: string) => dispatch(updateProfile({ name }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.2 }}
    >
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
        <CardsCheer packsCount={user.publicCardPacksCount} />
      </Card>
    </motion.div>
  )
}
