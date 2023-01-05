import React from 'react'
import { UsersList } from '../../features/users/UI/Users/UsersList/UsersList'
import { UsersFilter } from '../../features/users/UI/UsersFilter/UsersFilter'

export const UsersPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'flex-start',
        marginTop: 60,
      }}
    >
      <UsersList />
      <UsersFilter />
    </div>
  )
}
