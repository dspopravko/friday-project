import React, { useContext, useEffect } from 'react'
import { UsersList } from '../../features/users/UI/Users/UsersList/UsersList'
import { UsersFilter } from '../../features/users/UI/UsersFilter/UsersFilter'
import s from './UsersPage.module.css'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { goBackButtonTitles } from '../../layout/Header/Header'

export const UsersPage = () => {
  useSetHeaderTitle('Users')
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  useEffect(() => {
    setGoBackButtonTitle(goBackButtonTitles.back)
    return () => setGoBackButtonTitle(goBackButtonTitles.none)
  }, [])
  return (
    <div className={s.usersPageContainer}>
      <UsersList />
      <UsersFilter />
    </div>
  )
}
