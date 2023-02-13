import React, { useCallback, useEffect } from 'react'
import { UserItem } from '../UserItem/UserItem'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import {
  usersCurrentPageCount,
  usersMaxPageSelector,
  usersPendingSelector,
  usersSelector,
} from '../../../BLL/selectorsUsers'
import { CircularProgress, Typography } from '@mui/material'
import { TablePagination } from '../../../../../common'
import s from './UsersList.module.css'
import { useSearchParams } from 'react-router-dom'
import { getUsers } from '../../../BLL/usersThunk'
import { usersActions } from '../../../BLL/usersSlice'
import { AnimatePresence } from 'framer-motion'

export const UsersList = () => {
  const users = useAppSelector(usersSelector)
  const currentPage = useAppSelector(usersCurrentPageCount)
  const maxPage = useAppSelector(usersMaxPageSelector)
  const pending = useAppSelector(usersPendingSelector)
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  //state managing
  const stateManager = useCallback(() => {
    dispatch(usersActions.resetState())
  }, [searchParams])

  useEffect(() => {
    return () => {
      stateManager()
    }
  }, [])

  useEffect(() => {
    dispatch(getUsers(params))
  }, [searchParams])

  return (
    <div className={s.userListContainer}>
      <div className={s.listContainer} style={{ opacity: pending ? 0.4 : 1 }}>
        <AnimatePresence mode={'sync'}>
          {users.length &&
            users.map((u, i) => <UserItem index={i} user={u} key={u._id} />)}
        </AnimatePresence>
        {pending && (
          <div className={s.loaderContainer}>
            <CircularProgress />
          </div>
        )}
      </div>
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
