import React, { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../../../../context/context'
import { RegistrationForm } from './form/RegistrationForm'

export const Registration = () => {
  const { setTitle } = useContext(HeaderTitleContext)
  useEffect(() => {
    setTitle('Login page: registration')
  }, [])
  return (
    <div>
      Registration
      <RegistrationForm />
    </div>
  )
}
