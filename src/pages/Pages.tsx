import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './login/Login'
import { NewPassword } from './newPassword/NewPassword'
import { Profile } from './profile/Profile'
import { Error404 } from './error404/Error404'
import { SignUp } from './signUp/SignUp'
import { PasswordRestore } from './restore/PasswordRestore'
import { PATH } from '../data/paths'
import { SignUpSuccess } from './signUpSuccess/SignUpSucces'
import { PrivateRoutes } from '../hooks/PrivateRoutes'
import { Cards } from './cards/Cards'
import { Packs } from './packs/Packs'
import { Learn } from './learn/Learn'
import { UsersPage } from './users/UsersPage'
import { UserPage } from './user/UserPage'
import {AnimatePresence} from 'framer-motion'

export const Pages = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route key={PATH.PACKS} path={PATH.PACKS} element={<Packs/>}/>
          <Route key={PATH.PROFILE} path={PATH.PROFILE} element={<Profile/>}/>
          <Route key={PATH.USERS} path={PATH.USERS} element={<UsersPage/>}/>
          <Route key={PATH.USER} path={PATH.USER + '/:id'} element={<UserPage/>}/>
          <Route key={PATH.CARDS} path={PATH.CARDS + '/:id'} element={<Cards/>}/>
          <Route key={PATH.LEARN} path={PATH.LEARN + '/:id'} element={<Learn/>}/>
        </Route>
        <Route key={PATH.LOGIN.MAIN} path={PATH.LOGIN.MAIN} element={<Login/>}/>
        <Route key={PATH.LOGIN.RESTORE} path={PATH.LOGIN.RESTORE} element={<PasswordRestore/>}/>
        <Route key={PATH.LOGIN.SIGNUP} path={PATH.LOGIN.SIGNUP} element={<SignUp/>}/>
        <Route key={PATH.SUCCESS} path={PATH.SUCCESS} element={<SignUpSuccess/>}/>
        <Route key={PATH.NEWPASSWORD} path={PATH.NEWPASSWORD + '/:token'} element={<NewPassword/>}/>
        <Route key={'*'} path={'*'} element={<Error404/>}/>
        <Route key={'/'} path={''} element={<Navigate to={PATH.PACKS}/>}/>
      </Routes>
    </AnimatePresence>
  )
}
