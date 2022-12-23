import React, { useContext } from 'react'
import s from './Header.module.css'
import { HeaderContext } from '../../context/context'
import { useAppSelector } from '../../state/store'
import { ProfileHeaderButton } from '../../features/auth/profile/HeaderButton/ProfileHeaderButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { Button, Fab } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { isAuthSelector } from '../../features/auth/selectorsAuth'

export const Header = () => {
  const { title, goBackButtonTitle } = useContext(HeaderContext)
  const isAuth = useAppSelector(isAuthSelector)
  const navigate = useNavigate()
  const handleSignIn = () => navigate(PATH.LOGIN.MAIN)
  return (
    <div className={s.header}>
      <div className={s.buttonContainer}>
        <div className={s.back}>
          {goBackButtonTitle && (
            <Fab
              onClick={() => navigate(`/${PATH.PACKS}`)}
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
              {goBackButtonTitle}
            </Fab>
          )}
        </div>
        <div className={s.titleContainer}>{title || 'Loading...'}</div>
        {isAuth ? (
          <ProfileHeaderButton />
        ) : (
          <Button variant={'contained'} onClick={handleSignIn}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  )
}
