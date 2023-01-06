import React from 'react'
import { UserItem } from '../UserItem/UserItem'
import { useAppSelector } from '../../../../../state/store'
import {
  usersCurrentPage,
  usersMaxPageSelector,
  usersPendingSelector,
  usersSelector,
} from '../../../BLL/selectorsUsers'
import { CircularProgress, Typography } from '@mui/material'
import { TablePagination } from '../../../../../common/TablePagination/TablePagination'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'
import s from './UsersList.module.css'

export const UsersList = () => {
  const users = useAppSelector(usersSelector)
  const currentPage = useAppSelector(usersCurrentPage)
  const maxPage = useAppSelector(usersMaxPageSelector)
  const pending = useAppSelector(usersPendingSelector)
  const params = UseSearchParamsObject()
  return (
    <div className={s.userListContainer}>
      <div style={{ opacity: pending ? 0.4 : 1 }}>
        {users.map((u) => (
          <UserItem key={u._id} {...u} />
        ))}
      </div>
      {pending && (
        <div style={{ margin: '110px' }}>
          <CircularProgress />
        </div>
      )}
      {!users[0] && !pending && (
        <div style={{ margin: '10px' }}>
          <Typography>no users found</Typography>
        </div>
      )}
      {users.length > 4 && (
        <TablePagination
          page={currentPage}
          maxPage={maxPage}
          pageCount={+params.pageCount}
          initPageCount={10}
          title={'packs'}
        />
      )}
    </div>
  )
}
