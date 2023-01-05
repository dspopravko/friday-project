import React, { useContext } from 'react'
import s from './Header.module.css'
import { HeaderContext } from '../../context/context'
import { useAppSelector } from '../../state/store'
import { ProfileHeaderButton } from '../../features/auth/profile/UI/HeaderButton/ProfileHeaderButton'
import { NavLink, useNavigate } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { Button, Fab, IconButton } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { isAuthSelector } from '../../features/auth/common/selectors/selectorsAuth'
import Groups2Icon from '@mui/icons-material/Groups2'

export enum goBackButtonTitles {
  none = '',
  back = 'Go back',
  toPacks = 'Go back to packs lists',
}

export const Header = () => {
  const { goBackButtonTitle } = useContext(HeaderContext)
  const isAuth = useAppSelector(isAuthSelector)
  const navigate = useNavigate()
  const handleSignIn = () => navigate(PATH.LOGIN.MAIN)
  return (
    <div className={s.header}>
      <div className={s.buttonContainer}>
        <div className={s.back}>
          {goBackButtonTitle && (
            <Fab
              onClick={() => {
                if (goBackButtonTitle === 'Go back to packs lists') {
                  navigate(`/${PATH.PACKS}`)
                } else {
                  navigate(-1)
                }
              }}
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
        <div className={s.buttonGroup}>
          <NavLink to={`/`} className={s.titleContainer}>
            {'The Cards app🐬'}
          </NavLink>
        </div>
        <div className={s.buttonGroup}>
          <NavLink className={s.usersNavlink} to={`/${PATH.USERS}`}>
            <IconButton>
              <Groups2Icon fontSize="large" color="action" />
            </IconButton>
          </NavLink>
          {isAuth ? (
            <ProfileHeaderButton />
          ) : (
            <Button variant={'contained'} onClick={handleSignIn}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
