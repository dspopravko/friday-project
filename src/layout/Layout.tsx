import React, { ReactNode, useEffect } from 'react'
import { Header } from './Header/Header'
import { ErrorSnackbar, AppLoader } from '../common'
import { useAppDispatch, useAppSelector } from '../state/store'
import { authMe } from '../features/auth/login/BLL/loginThunks'
import { appStatusSelector } from '../state/selectors'
import { AnimatePresence } from "framer-motion";

type LayoutPropsType = {
  children: ReactNode
}

export const Layout = (props: LayoutPropsType) => {
  const status = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authMe({ ignoreError: true }))
  }, [])
  return (
    <AnimatePresence>
      {status === 'loading' && <AppLoader key={'loader'}/>}
      <ErrorSnackbar key={'errorSnackbar'}/>
      <Header key={'header'}/>
      <div key={'children'} style={{ display: 'flex', justifyContent: 'center' }}>
        {props.children}
      </div>
    </AnimatePresence>
  )
}
