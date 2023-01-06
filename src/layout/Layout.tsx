import React, { ReactNode, useEffect } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { ErrorSnackbar, AppLoader } from '../common'
import { appStatus } from '../state/appSlice'
import { useAppDispatch, useAppSelector } from '../state/store'
import { authMe } from '../features/auth/login/BLL/loginThunks'
import { appStatusSelector } from '../state/selectors'

type LayoutPropsType = {
  children: ReactNode
}

export const Layout = (props: LayoutPropsType) => {
  const status = useAppSelector(appStatusSelector)
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
