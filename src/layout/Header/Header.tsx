import React, { useContext } from 'react'
import s from './Header.module.css'
import { HeaderTitleContext } from '../../context/context'
import XButton from '../../common/components/button/XButton'
import { useAppSelector } from '../../state/store'
import { ProfileSmall } from '../../common/profileSmall/ProfileSmall'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../data/paths'

export const Header = () => {
  const { title } = useContext(HeaderTitleContext)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()
  const handleSignIn = () => navigate(PATH.LOGIN.MAIN)

  return (
    <div className={s.header}>
      <div className={s.buttonContainer}>
        <div className={s.titleContainer}>{title || 'Loading...'}</div>
        {isAuth ? (
          <ProfileSmall />
        ) : (
          <XButton onClick={handleSignIn}>Sign in</XButton>
        )}
      </div>
    </div>
  )
}
