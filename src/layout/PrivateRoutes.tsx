import React from 'react'
import { useAppSelector } from '../state/store'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
