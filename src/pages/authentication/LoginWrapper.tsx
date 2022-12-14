import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderTitleContext } from '../../context/context'
import { setPageTitle } from '../../services/pageTitle'
import { useAppSelector } from '../../state/store'
import s from './LoginWrapper.module.css'

export const LoginWrapper = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  useEffect(() => {
    setTitle('Login page')
    setPageTitle('Login')
  }, [])
  return (
    <div className="pageContainer">
      <Outlet context={{ isAuth: isAuth }} />
      <div className={s.loginWrapper}>
        <div className={s.heading}>Test login:password</div>
        Login: nya-admin@nya.nya <br /> Password: 1qazxcvBG
      </div>
    </div>
  )
}
