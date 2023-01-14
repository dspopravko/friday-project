import React from 'react'
import { UsersList } from '../../features/users/UI/Users/UsersList/UsersList'
import { UsersFilter } from '../../features/users/UI/UsersFilter/UsersFilter'
import s from './UsersPage.module.css'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'
import { motion } from 'framer-motion'

export const UsersPage = () => {
  useSetHeaderTitle('Users')
  useGoBackButton(goBackButtonTitles.back)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.2 }}
      className={s.usersPageContainer}
    >
      <UsersList />
      <UsersFilter />
    </motion.div>
  )
}
