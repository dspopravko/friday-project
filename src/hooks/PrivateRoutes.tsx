import React from 'react'
import { useAppSelector } from '../state/store'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthSelector } from '../features/auth/selectorsAuth'

export const PrivateRoutes = () => {
  const isAuth = useAppSelector(isAuthSelector)
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
