import React, { ReactNode, useEffect } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { ErrorSnackbar } from '../common/errorSnackbar/ErrorSnackbar'
import { appStatus } from '../state/appSlice'
import { AppLoader } from '../common/components/appLoader/appLoader'
import { useAppDispatch, useAppSelector } from '../state/store'
import { authMe } from '../features/auth/login/services/loginThunks'

type LayoutPropsType = {
  children: ReactNode
}

export const Layout = (props: LayoutPropsType) => {
  const { status } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authMe())
  }, [])
  if (status === appStatus.loading) {
    return <AppLoader />
  }
  return (
    <>
      <ErrorSnackbar />
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {props.children}
      </div>
      <Footer />
    </>
  )
}
