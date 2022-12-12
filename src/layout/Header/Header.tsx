import React, { useContext } from 'react'
import s from './Header.module.css'
import { HeaderTitleContext } from '../../context/context'
import { useAppSelector } from '../../state/store'
import { ProfileSmall } from '../../features/auth/components/profileSmall/ProfileSmall'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { Button, Fab, LinearProgress } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export const Header = () => {
  const { title } = useContext(HeaderTitleContext)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const appStatus = useAppSelector((state) => state.app.status)
  const navigate = useNavigate()
  const handleSignIn = () => navigate(PATH.LOGIN.MAIN)

  return (
    <div className={s.header}>
      <div className={s.buttonContainer}>
        <div className={s.back}>
          <Fab
            variant="extended"
            sx={{
              backgroundColor: 'hsla(0,0%,100%,0.5)',
              boxShadow: '0',
              textTransform: 'none',
              '&:hover': {
                background: '#FFF',
              },
            }}
          >
            <KeyboardBackspaceIcon sx={{ mr: 1 }} />
            Back to Packs List
          </Fab>
        </div>
        <div className={s.titleContainer}>{title || 'Loading...'}</div>
        {isAuth ? (
          <ProfileSmall />
        ) : (
          <Button variant={'contained'} onClick={handleSignIn}>
            Sign in
          </Button>
        )}
      </div>
      {appStatus === 0 && <LinearProgress />}
    </div>
  )
}
