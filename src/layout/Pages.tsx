import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../features/auth/components/login/Login'
import { NewPassword } from '../features/auth/components/newPassword/NewPassword'
import { Profile } from '../pages/profile/Profile'
import { Error404 } from '../pages/error404/Error404'
import { SignUp } from '../features/auth/components/signUp/SignUp'
import { PasswordRestore } from '../features/auth/components/restore/PasswordRestore'
import { Test } from '../pages/test/Test'
import { PATH } from '../data/paths'
import { SignUpSuccess } from '../features/auth/components/signUp/SignUpSucces'
import { PrivateRoutes } from './PrivateRoutes'

export const Pages = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Route>
      <Route path={PATH.LOGIN.MAIN} element={<Login />} />
      <Route path={PATH.LOGIN.RESTORE} element={<PasswordRestore />} />
      <Route path={PATH.LOGIN.SIGNUP} element={<SignUp />} />
      <Route path={PATH.SUCCESS} element={<SignUpSuccess />} />
      <Route path={PATH.NEWPASSWORD + '/:token'} element={<NewPassword />} />
      <Route path={PATH.TESTS} element={<Test />} />
      <Route path={'*'} element={<Error404 />} />
      <Route path={''} element={<Navigate to={PATH.PROFILE} />} />
    </Routes>
  )
}
