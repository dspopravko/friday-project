import React, { useContext, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards } from '../../features/tables/cards/BLL/cardsThunk'
import { CardsTableControls } from '../../features/tables/cards/UI/Controls/CardsTableControls'
import { CardsTable } from '../../features/tables/cards/UI/Table/CardsTable'
import {
  cardsCurrentPackInfo,
  currentPageSelector,
  maxPageSelector,
} from '../../features/tables/cards/BLL/selectorsCards'
import { TablePagination } from '../../features/tables/common/components/TablePagination'
import { userIDSelector } from '../../features/auth/common/selectors/selectorsAuth'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { cardsSlice } from '../../features/tables/cards/BLL/cardsSlice'
import { CardsHeader } from '../../features/tables/cards/UI/Header/CardsHeader'

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
    setGoBackButtonTitle('Go back to Packs list')
    return () => setGoBackButtonTitle('')
  }, [])
  useEffect(() => {
    id && dispatch(getCards({ cardsPack_id: id, ...params }))
  }, [id, searchParams])

  return (
    <div style={{ marginTop: 60 }}>
      <CardsHeader
        buttonTitle={isOwner ? 'Add new card' : 'Learn pack'}
        id={id}
      />
      <CardsTableControls />
      <CardsTable id={id || ''} />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        title={'cards'}
      />
    </div>
  )
}
