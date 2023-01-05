import React, { useContext, useEffect } from 'react'
import { UserPacksTable } from '../../features/user/UI/UserPacksTable'
import { UserBlock } from '../../features/user/UI/UserBlock'
import s from './UserPage.module.css'
import { useParams } from 'react-router-dom'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useAppSelector } from '../../state/store'
import { userSelector } from '../../features/user/BLL/selectorUser'

export const UserPage = () => {
  const user = useAppSelector(userSelector)
  useSetHeaderTitle(user.name || '')
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  useEffect(() => {
    setGoBackButtonTitle(goBackButtonTitles.back)
    return () => setGoBackButtonTitle(goBackButtonTitles.none)
  }, [])
  const { id } = useParams()
  return (
    <div className={s.userPageContainer}>
      <UserPacksTable id={id || ''} />
      <UserBlock id={id || ''} />
    </div>
  )
}
