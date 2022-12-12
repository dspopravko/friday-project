import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../../../context/context'
import { LoginForm } from './form/LoginForm'
import { useAppDispatch } from '../../../../state/store'
import { authMe } from '../../authThunks'

export const Login = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTitle('Login page')
    dispatch(authMe())
  }, [])

  return (
    <div>
      Login
      <LoginForm />
    </div>
  )
}
