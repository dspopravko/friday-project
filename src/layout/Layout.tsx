import React, { ReactNode } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { ErrorSnackbar } from '../common/errorSnackbar/ErrorSnackbar'
import { SuccessSignup } from '../common/succesSignup/SuccessSignup'

type LayoutPropsType = {
  children: ReactNode
}

export const Layout = (props: LayoutPropsType) => {
  return (
    <>
      <SuccessSignup />
      <ErrorSnackbar />
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {props.children}
      </div>
      <Footer />
    </>
  )
}
