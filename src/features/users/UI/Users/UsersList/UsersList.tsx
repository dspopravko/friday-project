import React from 'react'
import { UserItem } from '../UserItem/UserItem'
import { useAppSelector } from '../../../../../state/store'
import { usersSelector } from '../../../BLL/selectorsUsers'
import { Typography } from '@mui/material'

export const UsersList = () => {
  const users = useAppSelector(usersSelector)
  return (
    <div
      style={{
        width: '300px',
        backgroundColor: '#f3f3f3',
        borderRadius: '12px',
      }}
    >
      {users.map((u) => (
        <UserItem key={u._id} {...u} />
      ))}
      {!users[0] && (
        <div style={{ margin: '10px' }}>
          <Typography>no users found</Typography>
        </div>
      )}
    </div>
  )
}
