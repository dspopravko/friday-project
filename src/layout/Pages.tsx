import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../features/auth/components/login/Login'
import { PasswordNew } from '../features/auth/components/passwordNew/PasswordNew'
import { LoginWrapper } from '../pages/authentication/LoginWrapper'
import { Profile } from '../pages/profile/Profile'
import { Error404 } from '../pages/error404/Error404'
import { Registration } from '../features/auth/components/registration/Registration'
import { PasswordRestore } from '../features/auth/components/passwordRestore/PasswordRestore'
import { Test } from '../pages/test/Test'
import { PATH } from '../data/paths'

export const Pages = () => {
  return (
    <Routes>
      <Route path={''} element={<Navigate to={PATH.PROFILE} />} />
      <Route path={PATH.LOGIN.MAIN} element={<LoginWrapper />}>
        <Route index element={<Login />} />
        <Route path={PATH.LOGIN.RESTORE} element={<PasswordRestore />} />
        <Route path={PATH.LOGIN.REGISTRATION} element={<Registration />} />
      </Route>
      <Route path={`${PATH.NEWPASSWORD}/:token`} element={<PasswordNew />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.TESTS} element={<Test />} />

      <Route path={'*'} element={<Error404 />} />
    </Routes>
  )
}
