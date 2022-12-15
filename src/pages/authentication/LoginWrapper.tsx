import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../state/store'
import s from './LoginWrapper.module.css'
import { setTitle } from '../../services/setHeaderTitle'

export const LoginWrapper = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  setTitle('Login page', 'Login')
  return (
    <div className="pageContainer">
      <Outlet context={{ isAuth: isAuth }} />
      <div className={s.loginWrapper}>
        <div className={s.heading}>Use this for test:</div>
        Login: nya-admin@nya.nya <br /> Password: 1qazxcvBG
      </div>
    </div>
  )
}
