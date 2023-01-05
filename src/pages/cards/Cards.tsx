import React, { useContext, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards } from '../../features/cards/BLL/cardsThunk'
import { CardsTableControls } from '../../features/cards/UI/Controls/CardsTableControls'
import { CardsTable } from '../../features/cards/UI/Table/CardsTable/CardsTable'
import {
  cardsCurrentPackInfo,
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/BLL/selectorsCards'
import { TablePagination } from '../../common/TablePagination/TablePagination'
import { userIDSelector } from '../../features/auth/common/selectors/selectorsAuth'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { cardsSlice } from '../../features/cards/BLL/cardsSlice'
import { CardsHeader } from '../../features/cards/UI/Header/CardsHeader'
import { goBackButtonTitles } from '../../layout/Header/Header'

export const Cards = () => {
  useSetHeaderTitle('Cards')
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const currentPackInfo = useAppSelector(cardsCurrentPackInfo)
  const currentUserID = useAppSelector(userIDSelector)
  const isOwner = currentPackInfo.packUserId === currentUserID
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(cardsSlice.actions.resetPack())
    setGoBackButtonTitle(goBackButtonTitles.back)
    return () => setGoBackButtonTitle(goBackButtonTitles.none)
  }, [])
  useEffect(() => {
    id && dispatch(getCards({ cardsPack_id: id, ...params }))
  }, [id, searchParams])

  return (
    <div style={{ marginTop: 60 }}>
      <CardsHeader
        buttonTitle={isOwner ? 'Add new card' : 'Learn pack'}
        id={id || ''}
      />
      <CardsTableControls />
      <CardsTable />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        title={'cards'}
      />
    </div>
  )
}
