import React from 'react'
import { UsersList } from '../../features/users/UI/Users/UsersList/UsersList'
import { UsersFilter } from '../../features/users/UI/UsersFilter/UsersFilter'
import s from './UsersPage.module.css'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'

export const UsersPage = () => {
  useSetHeaderTitle('Users')
  useGoBackButton(goBackButtonTitles.back)

  return (
    <div className={s.usersPageContainer}>
      <UsersList />
      <UsersFilter />
    </div>
  )
}
