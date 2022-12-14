import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './login/Login'
import { NewPassword } from './newPassword/NewPassword'
import { Profile } from './profile/Profile'
import { Error404 } from './error404/Error404'
import { SignUp } from './signUp/SignUp'
import { PasswordRestore } from './restore/PasswordRestore'
import { Test } from './test/Test'
import { PATH } from '../data/paths'
import { SignUpSuccess } from './signUpSuccess/SignUpSucces'
import { PrivateRoutes } from '../hooks/PrivateRoutes'
import { Cards } from './cards/Cards'
import { Packs } from './packs/Packs'
import { Learn } from './learn/Learn'
import { UsersPage } from './users/UsersPage'
import { UserPage } from './user/UserPage'

export const Pages = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.USERS} element={<UsersPage />} />
        <Route path={PATH.USER + '/:id'} element={<UserPage />} />
        <Route path={PATH.CARDS + '/:id'} element={<Cards />} />
        <Route path={PATH.LEARN + '/:id'} element={<Learn />} />
      </Route>
      <Route path={PATH.LOGIN.MAIN} element={<Login />} />
      <Route path={PATH.LOGIN.RESTORE} element={<PasswordRestore />} />
      <Route path={PATH.LOGIN.SIGNUP} element={<SignUp />} />
      <Route path={PATH.SUCCESS} element={<SignUpSuccess />} />
      <Route path={PATH.NEWPASSWORD + '/:token'} element={<NewPassword />} />
      <Route path={PATH.TESTS} element={<Test />} />
      <Route path={'*'} element={<Error404 />} />
      <Route path={''} element={<Navigate to={PATH.PACKS} />} />
    </Routes>
  )
}
